const mongoose = require('mongoose')
 
const MessagesSchema = new mongoose.Schema(
  {
    room_id: {
      type: String,
      required: true,
    },
    primary_room_id: {
      type: mongoose.ObjectId,
      ref : "Room"
    },
    message: {
      // will be save only message
      type: String,
    },

    message_type: {
      type: String,
      enum: ["text", "media", "quote", "offer"],
      default: "text",
    },

    room_type: {
      type: Number,
      default: 0, // 0 => individual, 1 => Group
    },

    seen: {
      type: Boolean,
      default: false,
    },

    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
    },

    unique_id: {
      type: String,
      default: null,
    },

    attachments: [{
      // add when message_type == 'media'
      name: String,
      mime : String,
      size: String,
    }],

    quote_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quote",
    },

    is_Delete_from_sender:{
      type: Boolean,
      default:false
    },

    date: {
      type: Date,
    },

    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
    },
    clearChat: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],

    deletedAt: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
  
  module.exports = mongoose.model("messages", MessagesSchema);