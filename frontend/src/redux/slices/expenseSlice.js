// expenseSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://expense-manager-63kw.onrender.com/api/users";

export const getExpenses = createAsyncThunk('expense/getExpenses', async () => {
    const response = await axios.get(`${BASE_URL}/get-expenses`);
    return response.data;
});

export const addExpense = createAsyncThunk('expense/addExpense', async (expense) => {
    const response = await axios.post(`${BASE_URL}/add-expense`, expense);
    return response.data;
});

export const deleteExpense = createAsyncThunk('expense/deleteExpense', async (id) => {
    await axios.delete(`${BASE_URL}/delete-expense/${id}`);
    return id;
});

const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        expenses: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getExpenses.fulfilled, (state, action) => {
                state.expenses = action.payload;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.expenses.push(action.payload);
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
            })
            .addCase(getExpenses.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export default expenseSlice.reducer;
