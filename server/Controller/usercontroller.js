
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

const finduserbyid =  async (req, res) =>
  {
    const { id } = req.params; // Get the ID from the request parameters
    try {
        const user = await User.findById(id); // Find the product by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Return 404 if not found
        }
        res.status(200).json(user); // Return the found product
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
  
}

const deleteuserbyid = async (req, res) => {
  const { id } = req.params; 
  try {
      const deleteduser = await User.findByIdAndDelete(id); 
      if (!deleteduser) {
          return res.status(404).json({ message: 'User not found' }); 
      }
      res.status(200).json({ message: 'User deleted successfully' }); 
  } catch (error) {
      res.status(500).json({ message: error.message }); 
  }
}


const edituserbyid = async (req, res) => {
  try {
      const { id } = req.params;

      const user = await User.findByIdAndUpdate(id, req.body);

      if (!user) {
          return res.status(404).json({ message: "user not found" });
      }

      const updateduser = await User.findById(id);
      res.status(200).json(updateduser);

  } catch (error) {
      res.status(500).json({ message: error.message }); // Handle any errors
  }
}


  module.exports= {
    createUser,
    getphotos,
    getpdfs,
    findusers,
    finduserbyid,
    deleteuserbyid,
    edituserbyid

  }