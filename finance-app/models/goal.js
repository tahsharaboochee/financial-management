const goalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    description: { type: String, required: true },
    deadline: { type: Date, required: true }
});

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
