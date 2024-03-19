const mongoose = require('mongoose')
 
const RoomSchema = new mongoose.Schema({
    roomID: {
      type: String,
      required: true,
    },
    userID:{
        type: String,
        require:true,
    }
});
  
  module.exports = mongoose.model("rooms", RoomSchema);