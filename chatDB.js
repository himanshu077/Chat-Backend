require('dotenv').config()
const connectDB = require('./db/connect.js');
const Rooms =require('./models/room.js');
const Messages =require('./models/messages.js');
const User =require('./models/user.js');



const start = async()=>{
    try {
        await connectDB(process.env.MONGODB_URL)
        console.log("sucess");
    } catch (error) {
        console.log(error);
    }
}
start();