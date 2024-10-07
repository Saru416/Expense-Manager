// incomeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://expense-manager-63kw.onrender.com";

export const getIncomes = createAsyncThunk('income/getIncomes', async () => {
    const response = await axios.get(`${BASE_URL}/get-incomes`);
    return response.data;
});

export const addIncome = createAsyncThunk('income/addIncome', async (income) => {
    const response = await axios.post(`${BASE_URL}/add-income`, income);
    return response.data;
});

export const deleteIncome = createAsyncThunk('income/deleteIncome', async (id) => {
    await axios.delete(`${BASE_URL}/delete-income/${id}`);
    return id;
});

const incomeSlice = createSlice({
    name: 'income',
    initialState: {
        incomes: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getIncomes.fulfilled, (state, action) => {
                state.incomes = action.payload;
                state.error = null;
            })
            .addCase(addIncome.fulfilled, (state, action) => {
                state.incomes.push(action.payload);
                state.error = null;
            })
            .addCase(deleteIncome.fulfilled, (state, action) => {
                state.incomes = state.incomes.filter(income => income.id !== action.payload);
                state.error = null;
            })
            .addCase(getIncomes.rejected, (state, action) => {
                state.error = action.error.message; 
            })
            .addCase(addIncome.rejected, (state, action) => {
                state.error = action.error.message; 
            })
            .addCase(deleteIncome.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export default incomeSlice.reducer;
