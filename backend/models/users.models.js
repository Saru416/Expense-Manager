import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Income' }],
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
});

export const User = mongoose.model("User",UserSchema);