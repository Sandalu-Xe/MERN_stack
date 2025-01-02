const User = require('../models/user.model.js');
const Photo = require('../models/Photomodel.js');

//add functions

// Create a new product
const createUser =  async (req, res)  => {
  try {
    
    const { name, email,password,address,age } = req.body;
    const newuser = new User({ name, email, password,age, address });
    const saveduser = await newuser.save();

    res.status(200).json(saveduser);
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


  const getphotos = async (req, res) => {
    async (req, res) => {
      try {
        const photos = await Photo.find();
        res.status(200).json({ status: 200, data: photos });
      } catch (error) {
        console.error('Error fetching photos:', error.message);
        res.status(500).json({ status: 500, message: 'Internal server error' });
      }
    }
  }

  // Update a users

const getpdfs =  async (req, res) => {
  
  try {
    const photos = await Pdf.find();
    res.status(200).json({ status: 200, data: photos });
  } catch (error) {
    console.error('Error fetching photos:', error.message);
    res.status(500).json({ status: 500, message: 'Internal server error' });
  }
}

const findusers = async(req, res)  => {
  try {
      // Retrieve all products from the database
      const users = await User.find({}); // Find all products

      // Respond with the list of products
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}


  module.exports= {
    createUser,getphotos,getpdfs,findusers

  }