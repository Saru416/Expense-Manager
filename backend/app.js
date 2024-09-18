import express from "express";
import cors from 'cors';
import db from './db/db.js';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js'

dotenv.config();

const app = express()

const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // Adjust if you are using a different port or domain
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/",(req,res) => {
    res.send('Hello World')
})
//routes

app.use('/api/users', userRoutes);
app.use('/api/users', transactionRoutes);

const server = () =>{
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server();