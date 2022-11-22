const mongoose = require("mongoose");

var messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    senderId: {
      type: String,
      required: true,
      trim: true,
    },
    receiverId: {
      type: String,
      required: true,
      trim: true,
    },
    createTime:{
      type:String,
      default:  ''
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("messages", messageSchema);