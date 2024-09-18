import { addExpense,getExpenses, deleteExpense } from '../controllers/expense.js';
import { addIncome, getIncome, deleteIncome } from '../controllers/income.js';
import { protect } from '../middleware/authMiddleware.js';
import express from 'express';

const router = express.Router();

router.post('/add-income',protect,addIncome)
        .get('/get-incomes',protect,getIncome)
        .delete('/delete-income/:id',protect, deleteIncome)
        .post('/add-expense',protect,addExpense)
        .get('/get-expenses',protect,getExpenses)
        .delete("/delete-expense/:id",protect,deleteExpense)

export default router;