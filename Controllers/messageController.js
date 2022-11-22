const MESSAGE = require("../model/message");
const socketIO = require('socket.io');

exports.message = {

  delete: async (req, res) => {
    try {
      await MESSAGE.deleteMany({senderId : req.body.senderId , receiverId : req.body.receiverId});
      await MESSAGE.deleteMany({senderId : req.body.receiverId , receiverId : req.body.senderId});
      res.json({
        messsage : 'clear chat',
        data : await MESSAGE.find({})
      })
    } catch (error) {
      return res.status(200).send(error);
    }
  },
};
