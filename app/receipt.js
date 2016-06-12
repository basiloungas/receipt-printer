import ReceiptItem from './receiptItem';

export default class Receipt {
  constructor(items) {
    this.list = this._parseItems(items)
  }

  print() {
    const itemsText = this.list.map(item => item.getReceiptText())

    console.log('>> Receipt start <<');
    console.log(itemsText.join('\n*************\n'));
    console.log('>> Receipt end <<');
  }

  _parseItems(items) {
    return Object
      .keys(items)
      .sort()
      .map(type => ReceiptItem.create(type, items[type]));
  }
}
