const mongoose = require('mongoose');
let isConnected = false


export default async function connectToDB() {
    if(isConnected){
        console.log('Database is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("DataBase connected");
    } catch (error) {
        console.log(error);
    }


  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}