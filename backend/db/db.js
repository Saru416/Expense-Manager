import mongoose from 'mongoose';

const db = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Db Connected')
    } catch(error){
        console.log('DB Connection Error');
    }
}

export default db