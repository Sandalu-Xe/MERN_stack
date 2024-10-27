const User = require('../models/usermode.js');


//add functions

// Create a new product
const createUser =  async (req, res) => {
    try {
      
      //  const Product = await Product.create(req.body);

      const { name, quantity, price } = req.body;

      const newuser = new User({ name, quantity, price });
      const saveduser = await newuser.save();
      res.status(200).json(saveduser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports={
    createUser
  }