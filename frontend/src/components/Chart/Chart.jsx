import React from 'react';
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { useSelector } from 'react-redux';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function Chart() {
    const { incomes, expenses } = useSelector((state) => ({
        incomes: state.incomes.incomes || [], // Access incomes from Redux store
        expenses: state.expenses.expenses || [] // Access expenses from Redux store
    }));

    if (incomes.length === 0 && expenses.length === 0) {
        return <p>Loading data...</p>; // You can replace this with a loading spinner if needed
    }

    // Sort incomes and expenses by date (ascending)
    const sortedIncomes = [...incomes].sort((a, b) => new Date(a.date) - new Date(b.date));
    const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));

    const data = {
        labels: sortedIncomes.map((inc) => {
            const { date } = inc;
            return dateFormat(date); // Format the date
        }),
        datasets: [
            {
                label: 'Income',
                data: sortedIncomes.map((income) => {
                    const { amount } = income;
                    return amount; // Corrected data array for incomes
                }),
                backgroundColor: 'rgba(0, 255, 0, 0.2)', // Add transparency to the color
                borderColor: 'green',
                tension: 0.2
            },
            {
                label: 'Expenses',
                data: sortedExpenses.map((expense) => {
                    const { amount } = expense;
                    return amount; // Corrected data array for expenses
                }),
                backgroundColor: 'rgba(255, 0, 0, 0.2)', // Add transparency to the color
                borderColor: 'red',
                tension: 0.2
            }
        ]
    };

    return (
        <ChartStyled>
            <Line data={data} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart;
