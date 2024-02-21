const mongoose = require('mongoose')
 
const RoomchatSchema = new mongoose.Schema({
    roomID: {
      type: String,
      required: true,
    },
    userID:{
        type: String,
        require:true,
    }
});
  
  module.exports = mongoose.model("roomchat", RoomchatSchema);