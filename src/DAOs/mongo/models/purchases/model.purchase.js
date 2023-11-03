import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

const TicketModel = mongoose.model('Ticket', ticketSchema);

export default TicketModel;
