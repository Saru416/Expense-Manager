import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://expense-manager-63kw.onrender.com/api/transactions";

// Async thunk to fetch transactions
export const fetchTransactions = createAsyncThunk(
  'transaction/fetchTransactions',
  async () => {
    const response = await axios.get(`${BASE_URL}/get-transactions`);
    return response.data;
  }
);

// Async thunk to add a transaction
export const addTransaction = createAsyncThunk(
  'transaction/addTransaction',
  async (transaction) => {
    const response = await axios.post(`${BASE_URL}/add-transaction`, transaction);
    return response.data;
  }
);

// Async thunk to delete a transaction
export const deleteTransaction = createAsyncThunk(
  'transaction/deleteTransaction',
  async (id) => {
    await axios.delete(`${BASE_URL}/delete-transaction/${id}`);
    return id;
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          transaction => transaction._id !== action.payload
        );
      });
  },
});

export default transactionSlice.reducer;
