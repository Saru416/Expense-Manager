const ExpenseSchema = require("../models/expeModel")

exports.addExpense = async (req,res) => {
    const {title,amount,category,description,date} = req.body
 
    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        if(!title || !category || !description || !date){
            return res.status(400).json({message: "All diels are required"})
        }
        if(amount<=0 || !amount === "number"){
            return res.status(400).json({message: "Amount must be a postive number"})
        }
        await income.save()
        res.status(200).json({message: "Expense Added"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }

    console.log(income)
}

exports.getExpenses = async (req,res) => {
    try{
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error){
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req,res) => {
    const {id} = req.params;
    console.log(id)
    try {
        const result = await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({message: "Delete Income" + result})
      } catch(err) {
        res.status(500).json({message: err}) 
      }
}