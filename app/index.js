import Order from './order.js';
import orderData from '../order.json';

const order = new Order(orderData);
const receipt = order.getReceipt();
receipt.print();
