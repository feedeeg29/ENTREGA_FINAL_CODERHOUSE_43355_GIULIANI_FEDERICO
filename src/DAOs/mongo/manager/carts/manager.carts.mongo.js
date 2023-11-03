import cartModel from "../../models/carts/model.carts.mongo.js";
import { developmentLogger } from '../../../../utils/Logger/logger.js'

class cartManager {
    static getAllCarts = async (req, res, query) => {
        try {
            const options = {
                page: req.query.page || 1,
                limit: req.query.limit || 10,
                lean: true
            };

            const datosCart = await cartModel.paginate({}, options);
            const carts = datosCart.docs;
            const hasPrevPage = datosCart.hasPrevPage;
            const hasNextPage = datosCart.hasNextPage;
            const prevPage = datosCart.prevPage;
            const nextPage = datosCart.nextPage;
            return { carts, hasNextPage, hasPrevPage, nextPage, prevPage };
        } catch (err) {
            developmentLogger.fatal(err);
        }
    }
    static getOneCart = async (id) => {
        try {
            return await cartModel.findById(id).populate('items.productId').lean();
        } catch (err) {
            developmentLogger.fatal(err);
        }
    }
    static createCart = async (cart) => {
        try {
            const newCart = new cartModel(cart);
            return await newCart.save();
        } catch (err) {
            developmentLogger.fatal(err);
        }
    }
    // Función para agregar un producto al carrito


    static addToCart = async (cartId, productId) => {
        try {
            const cart = await cartModel.findById(cartId);

            const existingItem = cart.items.find(item => item.productId.toString() === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
            await cart.save();

            developmentLogger.info('Producto agregado al carrito');
        } catch (error) {
            developmentLogger.error('Error al agregar producto al carrito:', error);
        }
    }

    // Función para remover un producto del carrito
    static removeFromCart = async (cartId, productId) => {
        try {
            const cart = await cartModel.findById(cartId);
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex !== -1) {
                cart.items.splice(itemIndex, 1);

                await cart.save();

                developmentLogger.info('Producto removido del carrito');
            } else {
                developmentLogger.info('El producto no existe en el carrito');
            }
        } catch (error) {
            console.error(error)
            developmentLogger.error('Error al remover producto del carrito:', error);
        }
    }
    static updateCart = async (id, cart) => {
        try {
            return await cartModel.findByIdAndUpdate(id, cart, { new: true });
        } catch (err) {
            developmentLogger.fatal(err);
        }
    }

    // Función para vaciar el carrito
    static clearCart = async (cartId) => {
        try {

            const cart = await cartModel.findById(cartId);
            cart.items = [];
            await cart.save();

            developmentLogger.info('Carrito vaciado');
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
            developmentLogger.fatal(error)
        }
    }
    static deleteCart = async (id) => {
        try {
            return await cartModel.findByIdAndDelete(id);
        } catch (err) {
            developmentLogger.fatal(err);
        }
    }

    static async purchaseCart(cart) {
        const productsToPurchase = [];
        const productsToRemove = [];

        for (const item of cart.items) {
            const product = await ProductManager.getOne(item.productId);

            if (!product) {
                productsToRemove.push(item.productId);
                continue;
            }

            if (product.stock >= item.quantity) {
                productsToPurchase.push({ product, quantity: item.quantity });
            } else {
                productsToRemove.push(item.productId);
            }
        }

        for (const productInfo of productsToPurchase) {
            const { product, quantity } = productInfo;
            product.stock -= quantity;
            await product.save();
        }

        // Limpiar el carrito
        await this.clearCart(cart._id);

        return { purchasedProducts: productsToPurchase.map(productInfo => productInfo.product), notPurchasedProducts: productsToRemove };
    }
}

export default cartManager

