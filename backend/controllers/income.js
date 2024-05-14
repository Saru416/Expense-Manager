const IncomeSchema = require("../models/incomeModel")


exports.addIncome = async (req,res) => {
    const {title,amount,category,description,date} = req.body

    const income = IncomeSchema({
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
        res.status(200).json({message: "Income Added"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }

    console.log(income)
}

exports.getIncome = async (req,res) => {
    try{
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error){
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req,res) => {
    const {id} = req.params;
    // IncomeSchema.findByIdAndDelete(id)
    //     .then((income)=>{
    //         res.statues(200).json({messsage: "Income Deleted"})
    //     })
    //     .catch((err)=> {
    //         res.status(500).json({message: 'Server Error'})
    //     })
    try {
        const result = await IncomeSchema.findByIdAndDelete(id);
        res.status(200).json({message: "Delete Income" + result})
      } catch(err) {
        res.status(500).json({message: err}) 
      }
}