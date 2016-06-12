import ReceiptTypes from './receiptTypes';

export default class ReceiptItem {
  constructor(count = 0) {
    this.count = count;
  }

  getBillableItems() {
    return this.count;
  }

  getTotalPrice() {
    return this.getBillableItems() * this.price;
  }

  hasDiscount() {
    return false;
  }

  getReceiptText() {
    return [
      `${this.type}: ${this.count}`,
      `${this.getBillableItems()} * ${this.price}ct`,
      `Total: ${this.getTotalPrice()}ct`
    ].join('\n');
  }

  static create(type, count) {
    switch (type) {
      case ReceiptTypes.APPLE:
        return new ReceiptItemApple(count);
      case ReceiptTypes.BANANA:
        return new ReceiptItemBanana(count);
      case ReceiptTypes.ORANGE:
        return new ReceiptItemOrange(count);
      case ReceiptTypes.PAPAYA:
        return new ReceiptItemPapaya(count);
      default:
        throw new Error(`type "${type}" is not valid`)
    }
  }
}

export class ReceiptItemApple extends ReceiptItem {
  constructor(count) {
    super(count);
    this.type = ReceiptTypes.APPLE;
    this.price = 25;
  }
}

export class ReceiptItemBanana extends ReceiptItem {
  constructor(count) {
    super(count);
    this.type = ReceiptTypes.BANANA;
    this.price = 15;
  }
}

export class ReceiptItemOrange extends ReceiptItem {
  constructor(count) {
    super(count);
    this.type = ReceiptTypes.ORANGE;
    this.price = 30;
  }
}

export class ReceiptItemPapaya extends ReceiptItem {
  constructor(count) {
    super(count);
    this.type = ReceiptTypes.PAPAYA;
    this.price = 50;
  }

  hasDiscount() {
    return this.count > 2;
  }

  getBillableItems() {
    const thirds = Math.floor(this.count / 3);
    const remainder = this.count % 3;

    return (thirds * 2) + remainder;
  }

  getReceiptText() {
    if (!this.hasDiscount()) {
      return super.getReceiptText();
    }

    return [
      `${this.type}: ${this.count}`,
      '"three for the price of two discount"',
      `${this.getBillableItems()} * ${this.price}ct`,
      `Total: ${this.getTotalPrice()}ct`
    ].join('\n');
  }
}
