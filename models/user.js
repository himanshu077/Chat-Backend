const mongoose = require('mongoose')
 
const UserchatSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    is_online:{
      type: String,
      require: true,
  },
    email:{
        type: String,
        require: true,
    },
    password: {
      type: String,
      required: true,
    },
});
  
  module.exports = mongoose.model("userchat", UserchatSchema);