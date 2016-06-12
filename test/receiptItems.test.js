import chai, {expect} from 'chai';
import ReceiptItem, {
  ReceiptItemApple,
  ReceiptItemBanana,
  ReceiptItemOrange,
  ReceiptItemPapaya
} from '../app/receiptItem';


describe('ReceiptItems', () => {
  describe('ReceiptItem', () => {
    describe('#constructor', () => {
      it('stores argument as this.count', () => {
        const instance = new ReceiptItem(5);
        expect(instance.count).to.equal(5);
      });
    });

    describe('#getBillableItems', () => {
      it('returns count', () => {
        const instance = new ReceiptItem(5);
        expect(instance.getBillableItems()).to.equal(5);
      });
    });

    describe('@create', () => {
      it('returns a new instance of ReceiptType based on type argument and passes count argument', () => {
        let instance = ReceiptItem.create('orange', 11);
        expect(instance).to.be.instanceOf(ReceiptItemOrange);
        expect(instance.count).to.equal(11);

        instance = ReceiptItem.create('apple', 22);
        expect(instance).to.be.instanceOf(ReceiptItemApple);
        expect(instance.count).to.equal(22);

        instance = ReceiptItem.create('banana', 22);
        expect(instance).to.be.instanceOf(ReceiptItemBanana);
        expect(instance.count).to.equal(22);

        instance = ReceiptItem.create('papaya', 22);
        expect(instance).to.be.instanceOf(ReceiptItemPapaya);
        expect(instance.count).to.equal(22);
      });

      it('throws if passed type is invalid', () => {
        const func = () => ReceiptItem.create('invalidType', 22);
        expect(func).to.throw('type "invalidType" is not valid')

      });
    })
  });

  describe('ReceiptItemApple', () => {
    describe('#constructor', () => {
      it('sets type and price values', () => {
        const instance = new ReceiptItemApple();
        expect(instance.type).to.equal('apple');
        expect(instance.price).to.equal(25);
      });
    });

    describe('#hasDiscount', () => {
      it('return false', () => {
        const instance = new ReceiptItemApple(5);
        expect(instance.hasDiscount()).to.equal(false);
      });
    });
  });

  describe('ReceiptItemBanana', () => {
    describe('#constructor', () => {
      it('sets type and price values', () => {
        const instance = new ReceiptItemBanana();
        expect(instance.type).to.equal('banana');
        expect(instance.price).to.equal(15);
      });
    });

    describe('#hasDiscount', () => {
      it('return false', () => {
        const instance = new ReceiptItemBanana(5);
        expect(instance.hasDiscount()).to.equal(false);
      });
    });
  });

  describe('ReceiptItemOrange', () => {
    describe('#constructor', () => {
      it('sets type and price values', () => {
        const instance = new ReceiptItemOrange();
        expect(instance.type).to.equal('orange');
        expect(instance.price).to.equal(30);
      });
    });

    describe('#hasDiscount', () => {
      it('return false', () => {
        const instance = new ReceiptItemOrange(5);
        expect(instance.hasDiscount()).to.equal(false);
      });
    });
  });

  describe('ReceiptItemPapaya', () => {
    describe('#constructor', () => {
      it('sets type and price values', () => {
        const instance = new ReceiptItemPapaya();
        expect(instance.type).to.equal('papaya');
        expect(instance.price).to.equal(50);
      });
    });

    describe('#hasDiscount', () => {
      it('return true if count is more than two', () => {
        let instance = new ReceiptItemPapaya(2);
        expect(instance.hasDiscount()).to.equal(false);

        instance = new ReceiptItemPapaya(3);
        expect(instance.hasDiscount()).to.equal(true);
      });
    });

    describe('#getBillableItems', () => {
      it('calculates the "three for the price of two" discount and returns the count of the billable items', () => {
        let instance = new ReceiptItemPapaya(2);
        expect(instance.getBillableItems()).to.equal(2);

        instance.count = 3;
        expect(instance.getBillableItems()).to.equal(2);

        instance.count = 10;
        expect(instance.getBillableItems()).to.equal(7);

        instance.count = 11;
        expect(instance.getBillableItems()).to.equal(8);

        instance.count = 12;
        expect(instance.getBillableItems()).to.equal(8);
      });
    });

    describe('#getReceiptText', () => {
      it('includes the "three for the price of two discount" text if it qualifies for discount', () => {
        const discountText = 'three for the price of two discount';

        let instance = new ReceiptItemPapaya(2);
        expect(instance.getReceiptText()).to.not.include(discountText);

        instance.count = 3;
        expect(instance.getReceiptText()).to.include(discountText);
      });
    });
  });
});
