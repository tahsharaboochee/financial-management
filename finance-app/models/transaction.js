const mongoose = require('mongoose');

const allowedCategories = ['Groceries', 'Job', 'Utilities', 'Rent', 'Salary', 'Investment', 'Entertainment', 'Miscellaneous'];

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['income', 'expense', 'saving'], required: true },
    amount: { type: Number, required: true },
    category: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(value) {
                return allowedCategories.includes(value);
            },
            message: 'Invalid category'
        }
    },
    description: { type: String }, // Optional field for more details about the transaction
    date: { type: Date, default: Date.now }, // Use for tracking when the transaction occurred
    tags: [{ type: String }], // Optional tags for additional categorization and search flexibility
    recurring: {
        type: Boolean,
        default: false
    }, // Optional: marks if this is a recurring transaction
    frequency: {
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly', null], // Frequency of the recurring transaction
        default: null
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
