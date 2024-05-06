const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['income', 'expense', 'saving'] },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
