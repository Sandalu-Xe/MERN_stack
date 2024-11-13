// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/usermode.js');
const Signup=require('./models/Signupmodel.js')
const pdf=require('./models/Pdfmodel.js')

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies


app.get('/', async (req, res) => {
  res.send(" hello from node api sandalu thushan ");
})

app.post('/adduser', async (req, res) => {
  try {
    
    //  const Product = await Product.create(req.body);

    const { name, email,password,address,age } = req.body;

    const newuser = new User({ name, email, password,age, address });
    const saveduser = await newuser.save();

    res.status(200).json(saveduser);
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/signup', async (req, res) => {
  try {
    
    //  const Product = await Product.create(req.body);

    const { name, email,password,confirmPassword } = req.body;

    const newuser = new Signup({ name, email, password,confirmPassword});
    const saveduser = await newuser.save();

    res.status(200).json(saveduser);
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.json({ err: "User Not Found" });
    }
    if (user.password === password) {
      return res.json({ status: "ok" });
    } else {
      return res.json({ status: "Incorrect Password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server Error" });
  }
});




app.get('/users', async (req, res) => {
  try {
      // Retrieve all products from the database
      const users = await User.find({}); // Find all products

      // Respond with the list of products
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
})



app.get('/edituser/:id', async (req, res) => {
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
});



app.delete('/user/:id', async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters
  try {
      const deleteduser = await User.findByIdAndDelete(id); // Find and delete the product by ID
      if (!deleteduser) {
          return res.status(404).json({ message: 'User not found' }); // Return 404 if product is not found
      }
      res.status(200).json({ message: 'User deleted successfully' }); // Return success message
  } catch (error) {
      res.status(500).json({ message: error.message }); // Handle any errors
  }
});

 

app.put('/edituser/:id', async (req, res) => {
  try {
      const { id } = req.params;//.Get the ID from the request parameters

      const user = await User.findByIdAndUpdate(id, req.body);

      if (!user) {
          return res.status(404).json({ message: "user not found" });
      }

      const updateduser = await User.findById(id);
      res.status(200).json(updateduser);

  } catch (error) {
      res.status(500).json({ message: error.message }); // Handle any errors
  }
});


mongoose.connect('mongodb+srv://user1:Thush12213@cluster0.9qwykfs.mongodb.net/MERN2?retryWrites=true&w=majority&appName=Cluster0', {
  
}).then(() => {

      console.log("connected to the database sandalu 🚀🚀🚀🚀");

       app.listen(3001,()=>{
        console.log("server is running on port 3001");
    
    });
      
})
.catch((err) => {
    console.error("Database connection error:", err);
});


//create schema add new schema


