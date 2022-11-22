const messageController = require('../Controllers/messageController')
const express = require("express");
const router = express.Router();

router.post('/delete' , (req,res) => messageController.message.delete(req,res))

module.exports = router;