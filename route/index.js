const express = require("express");
const router = express.Router();

const userRoutes = require('./userRoute');
const messageRoutes = require('./messageRoute');
router.use('/user' , userRoutes);
router.use('/message' , messageRoutes);

module.exports = router;