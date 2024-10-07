import {Expense} from "../models/expeModel.js";
import redis from "../Service/redisClient.js";

export const addExpense = async (req,res) => {
    const {title,amount,category,description,date} = req.body

    try {
        if(!title || !category || !description || !date){
            return res.status(400).json({message: "All diels are required"})
        }
        if(amount<=0 || !amount === "number"){
            return res.status(400).json({message: "Amount must be a postive number"})
        }

        const expense = Expense({
            user: req.user.id,
            title,
            amount,
            category,
            description,
            date
        });

        await expense.save()

        await redis.del('expenses');
        res.status(200).json({message: "Expense Added"});
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}

export const getExpenses = async (req,res) => {
    try{
        const cacheExpenses = await redis.get('expense');
        if(cacheExpenses){
            console.log("Serving from Redis Cache");
            return res.status(200).json(JSON.parse(cacheExpenses));
        }
        const expenses = await Expense.find({user: req.user.id }).sort({createdAt: -1})

        await redis.set('expenses',JSON.stringify(expenses), {ex: 3600})
        res.status(200).json(expenses);
    } catch (error){
        res.status(500).json({message: 'Server Error'});
    }
}

export const deleteExpense = async (req,res) => {
    const {id} = req.params;

    try {
        const expense = await Expense.findByIdAndDelete(id);

        if (!expense) {
            return res.status(404).jsoon({message: "Expense not Found!"});
        }

        if (expense.user.toString() !== req.user.id){
            return res.status(401).json({message: "Not authorized to delete this expense"});
        }
        await expense.remove();

        await redis.del('expenses');

        res.status(200).json({message: "Expense Delected"});
      } catch(err) {
        res.status(500).json({message: err.message}); 
      }
}