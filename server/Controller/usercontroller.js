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


  const Findusers = async (req, res) => {
    try {
        // Retrieve all products from the database
        const users = await User.find({}); // Find all products
  
        // Respond with the list of products
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }

  // Update a users

const upadateusers=  async (req, res) => {
  try {
      const { id } = req.params;//.Get the ID from the request parameters

      const user = await User.findByIdAndUpdate(id, req.body);

      if (!user) {
          return res.status(404).json({ message: "user not found" });
      }

      const updateduser = await User.findById(id);
      res.status(200).json(updateduser);// Return the updated product

  } catch (error) {
      res.status(500).json({ message: error.message }); // Handle any errors
  }
}

  module.exports={
    createUser,Findusers,upadateusers
  }