
const mongoose =require('mongoose')



const connectDb = (URL)=>{
    return mongoose.connect(URL,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true,   //no need because both option bcoz new version mongoose dont reqquire
    })
}
module.exports = connectDb;