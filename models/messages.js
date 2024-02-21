const mongoose = require('mongoose')
 
const MessagesSchema = new mongoose.Schema({
    roomID: {
      type: String,
      required: true,
    },
    userID:{
        type: String,
        require:true,
    },
    messages:{
        type: String,
        require:true,
    }
});
  
  module.exports = mongoose.model("messagesmodule", MessagesSchema);