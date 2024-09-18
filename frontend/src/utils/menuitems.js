import { dashboard, expenses, transactions, trend } from "./icons"

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard',
    },
    {
        id: 2,
        title: 'View Transactions',
        icon: transactions,
        link: '/dashboard',
    },
    {
        id: 3,
        title: 'Incomes',
        icon: trend,
        link: '/income',
    },
    {
        id: 4,
        title: 'Expenses',
        icon: expenses,
        link: '/expense',
    }
]