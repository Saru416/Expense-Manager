// selectors.js
export const selectIncomes = (state) => state.incomes.incomes;
export const selectExpenses = (state) => state.expenses.expenses;
export const selectTotalIncome = (state) => state.incomes.incomes.reduce((total, income) => total + income.amount, 0);
export const selectTotalExpenses = (state) => state.expenses.expenses.reduce((total, expense) => total + expense.amount, 0);
export const selectTotalBalance = (state) => selectTotalIncome(state) - selectTotalExpenses(state);
export const selectUser = (state) => state.user;  // Assuming you have a user slice
export const selectIsAuthenticated = (state) => state.auth;  // Assuming you have auth slice
