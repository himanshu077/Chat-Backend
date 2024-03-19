const mongoose = require('mongoose')
 
const UsersSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        
    },
    email:{
        type: String,
        require: true,
        unique:true,
    },
    password: {
      type: String,
      required: true,
    },
});
  
  module.exports = mongoose.model("Users", UsersSchema);