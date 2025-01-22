import React, { useEffect } from "react";
import styled from "styled-components";
import { Innerlayout } from "../../styles/Layouts";
import IncomeItem from "../incomeItem/incomeItem";
import ExpensesForm from "./ExpenseForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, getExpenses } from "../../redux/slices/expenseSlice";

function Expenses(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const expenses = useSelector((state) => state.expenses.expenses);
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const isAuthenticated = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            dispatch(getExpenses());
        }
    }, [isAuthenticated, dispatch, navigate])

    const handleDeleteExp = (id) => {
        console.log("Deleting exp with ID:", id);
        dispatch(deleteExpense(id));
    };

    return (
        <ExpensesStyled>
            <Innerlayout>
                <h1>Expenses</h1>
                <h2 className="total-income">Total Expense: <span>₹{totalExpenses}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpensesForm/>
                    </div>
                    <div className="incomes">
                        {expenses.map((expense) => {
                            const {_id,title,amount,date,category,description,type} = expense;
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem = {() => handleDeleteExp(_id)}
                            />
                        })}
                    </div>
                </div>
            </Innerlayout>
        </ExpensesStyled>
    )
}

const ExpensesStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: red;
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Expenses