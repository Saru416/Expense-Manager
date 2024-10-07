import {Income} from "../models/incomeModel.js";
import redis from "../Service/redisClient.js";

export const addIncome = async (req,res) => {
    const {title,amount,category,description,date} = req.body;

    try {
        if(!title || !category || !description || !date){
            return res.status(400).json({message: "All diels are required"})
        }
        if(amount<=0 || !amount === "number"){
            return res.status(400).json({message: "Amount must be a postive number"})
        }

        const income = Income({
            user: req.user.id,
            title,
            amount,
            category,
            description,
            date
        })

        await income.save()

        await redis.del('incomes');

        res.status(200).json({message: "Income Added",income})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
};

export const getIncome = async (req,res) => {
    try{
        const cacheIncomes = await redis.get('incomes');
        if(cacheIncomes){
            console.log("Serving from Redis Cache");
            return res.status(200).json(cacheIncomes);
        }

        const incomes = await Income.find({user: req.user.id}).sort({createdAt: -1})
        
        await redis.set('incomes',JSON.stringify(incomes), {ex: 3600})
        
        res.status(200).json(incomes);
    } catch (error){
        res.status(500).json({message: 'Server Error'});
    }
}

export const deleteIncome = async (req,res) => {
    const {id} = req.params;
    try {
        const income = await Income.findById(id);

        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        // Check if the expense belongs to the authenticated user
        if (income.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized to delete this income" });
        }

        await Income.findByIdAndDelete(id);

        await redis.del('incomes');
        
        res.status(200).json({ message: "Income Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}