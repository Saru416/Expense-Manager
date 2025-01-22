import React, { useEffect } from "react";
import styled from "styled-components";
import { Innerlayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import IncomeItem from "../incomeItem/incomeItem";
import { getIncomes, deleteIncome } from "../../redux/slices/incomeSlice";
import { useDispatch, useSelector } from "react-redux";

function Income(){
    const dispatch = useDispatch();
    
    const incomes = useSelector((state) => state.incomes.incomes);
    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
    
    useEffect(() => {
        dispatch(getIncomes());
    }, [dispatch]);

    const handleDeleteIncome = (id) => {
        console.log("Deleting income with ID:", id);
        dispatch(deleteIncome(id));
    };

    return (
        <IncomeStyled>
            <Innerlayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>₹{totalIncome}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form/>
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const {_id,title,amount,date,category,description,type} = income;
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
                                deleteItem = {() => handleDeleteIncome(_id)}
                            />
                        })}
                    </div>
                </div>
            </Innerlayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
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
            color: var(--color-green);
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

export default Income