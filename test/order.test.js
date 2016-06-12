import chai, {expect} from 'chai';
import Order from '../app/order';
import Receipt from '../app/receipt';

describe('Order', () => {
  describe('#constructor', () => {
    it('initializes this.list to an empty object', () => {
      const instance = new Order();
      expect(instance.list).to.eql({});
    });

    it('parses optional orderData parameter and adds each item', () => {
      const instance = new Order(['orange', 'orange', 'apple']);
      expect(instance.list).to.eql({
        orange: 2,
        apple: 1
      });
    });
  });

  describe('#addItem', () => {
    it('increments item type\'s counter by one', () => {
      const instance = new Order();
      expect(instance.list).to.eql({});

      instance.addItem('orange');
      expect(instance.list).to.eql({orange: 1});

      instance.addItem('orange');
      expect(instance.list).to.eql({orange: 2});

      instance.addItem('apple');
      expect(instance.list).to.eql({orange: 2, apple: 1});
    });
  });

  describe('#getReceipt', () => {
    it('returns a Receipt instance', () => {
      const instance = new Order();
      expect(instance.getReceipt()).to.be.instanceOf(Receipt);
    });
  });
});
