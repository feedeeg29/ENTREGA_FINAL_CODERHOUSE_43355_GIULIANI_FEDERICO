import TicketModel from '../Models/model.ticket.mongo.js';

class TicketService {
    static async createTicket(ticketData) {
        try {
            const newTicket = new TicketModel(ticketData);
            try {
                const cartId = req.params.cid;
                const cart = await ActionsMongo.getOneCart(cartId);

                if (!cart) {
                    return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
                }

                const productsToPurchase = [];
                const productsToRemove = [];

                for (const item of cart.items) {
                    const product = await ActionsMongo.getOneProduct(item.productId);

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

                await ActionsMongo.clearCart(cartId);

                const purchasedProductsIds = productsToPurchase.map(productInfo => productInfo.product._id);
                const notPurchasedProductsIds = productsToRemove;

                if (purchasedProductsIds.length > 0) {
                    const ticketData = {
                        userId: req.session.user._id,
                        products: purchasedProductsIds,
                    };
                    await TicketService.createTicket(ticketData);
                }

                res.status(200).json({ status: 'success', purchased: purchasedProductsIds, notPurchased: notPurchasedProductsIds });
            } catch (err) {
                res.status(500).json({ status: 'error', message: err.message });
            }
            return await newTicket.save();
        } catch (err) {
            throw new Error('Error al crear el ticket: ' + err.message);
        }
    }

}

export default TicketService;
