import products from "../DAOs/fs/Models/Products/products.js";
import carts from "../DAOs/fs/Models/Carts/carts.js";
import { developmentLogger } from '../utils/Logger/logger.js'

class Actions {
  // Product methods
  static async getAll() {
    const data = await products.getAllProducts()
    return data;
  }
  static getOne(id) {
    return products.getProduct(id);
  }
  static add(product) {
    return products.addProduct(product);
  }
  static update(id, newContent) {
    return products.updateProduct(id, newContent);
  }
  static delete(id) {
    return products.deleteProduct(id);
  }
  // Cart methods
  static createCart(prods) {
    return carts.createCart(prods).id;
  }

  static deleteCart(id) {
    return carts.deleteCart(id);
  }

  static async getCartProducts(id) {
    const carrito = await cart.getCart(id);

    const array = carrito.products
    return array;
  }

  static async addToCart(id, productId) {
    const product = await this.getOne(productId);
    developmentLogger.info(product);
    return carts.addToCart(id, product);
  }

  static deleteFromCart(id, productId) {
    return carts.deleteFromCart(id, productId);
  }
}

export default Actions;

