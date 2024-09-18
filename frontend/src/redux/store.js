import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './slices/expenseSlice';
import incomeReducer from './slices/incomeSlice';
import authReducer from './slices/userSlice';
import transactionReducer from './slices/transactionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    incomes: incomeReducer,
    transaction: transactionReducer
  },
});

export default store;