import React, { createContext, useContext, useState, useEffect } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/users";


const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {

    const [incomes,setIncomes] = useState([]);
    const [expenses,setExpenses] = useState([]);
    const [error,setError] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally, you can verify the token by making a request to a protected route
            // For simplicity, we'll assume the token is valid and set isAuthenticated to true
            setIsAuthenticated(true);
            // Optionally, set user information if stored in localStorage or decode the token
            // setUser(decodedUser);
        }
    }, []);

    const loginUser = async (credentials) => {
        try{
            const response = await axios.post(`${BASE_URL}/login`,credentials);
            setUser(response.data.user);
            setIsAuthenticated(true);
            localStorage.setItem('token',response.data.token);
            console.log('Login successful');
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        } catch (error) {
            setError(error.response?.data?.message);
        }
    };

    const registerUser = async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}/addUser`, credentials);
            setUser(response.data.user);
            setIsAuthenticated(true);
            localStorage.setItem('token', response.data.token);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const logoutUser = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}/add-income`,income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        getIncomes();
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}/get-incomes`)
        setIncomes(response.data);
        console.log(response.data);
    }

    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}/delete-income/${id}`)
        getIncomes()
        console.log(res)
        }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome += income.amount
        })

        return totalIncome;
    }
    
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}/add-expense`,income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}/get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}/delete-expense/${id}`)
        getExpenses()
        }

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) => {
            totalExpense += expense.amount
        })

        return totalExpense;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0,3)
    }

    return (
        <GlobalContext.Provider value ={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            expenses,
            totalBalance,
            transactionHistory,
            error,
            user,
            isAuthenticated,
            loginUser,
            registerUser,
            logoutUser
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}