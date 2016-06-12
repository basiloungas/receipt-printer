import Receipt from './receipt';

export default class Order {
  constructor(orderData = []) {
    this.list = {}
    this._parseOrderData(orderData);
  }

  addItem(type) {
    this.list[type] = (this.list[type] || 0) + 1;
  }

  getReceipt() {
    return new Receipt(this.list);
  }

  _parseOrderData(orderList) {
    orderList.forEach(item => this.addItem(item));
  }
}
