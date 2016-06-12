import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import Receipt from '../app/receipt';
import ReceiptItem, {ReceiptItemApple, ReceiptItemOrange} from '../app/receiptItem';


describe('Receipt', () => {
  beforeEach(function () {
    this.items = {
      orange: 2,
      apple: 1
    };

    this.sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    this.sandbox.restore();
  });

  describe('#constructor', () => {
    it('parses given items, sorts them and creates a list of ReceiptItem instances', function () {
      const instance = new Receipt(this.items);
      expect(instance.list).to.have.length(2)
      expect(instance.list[0]).to.be.instanceOf(ReceiptItem);
      expect(instance.list[0]).to.be.instanceOf(ReceiptItemApple);
      expect(instance.list[1]).to.be.instanceOf(ReceiptItem);
      expect(instance.list[1]).to.be.instanceOf(ReceiptItemOrange);
    });
  });

  describe('#print', () => {
    it('calls receiptText on every ReceiptItem', function () {
      const consoleStub = this.sandbox.stub(console, 'log');
      const instance = new Receipt(this.items);
      const spy = this.sandbox.spy(ReceiptItem.prototype, 'getReceiptText');

      instance.print();
      expect(spy).to.be.calledTwice;

      consoleStub.restore();
    });
  })
});
