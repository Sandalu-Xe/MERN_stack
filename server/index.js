// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usermodel=require("./models//usermode.js")
// Initialize the app
const app = express();


// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB (example URL)
mongoose.connect('mongodb+srv://user1:Thush12213@cluster0.9qwykfs.mongodb.net/MERN2?retryWrites=true&w=majority&appName=Cluster0', {
  
}).then(() => {
    console.log("mongodb connected sucessfully");
}).catch((err) => {
    console.error("Database connection error:", err);
});


//create schema add new schema

app.post('/register', async (req, res) => {
    try {
      
      //  const Product = await Product.create(req.body);

      const { name, email, password } = req.body;

      const newuser = new user({ name, email, password});
      const saveduser = await newuser.save();
      res.status(200).json(saveduser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.listen(3001,()=>{
    console.log("serever is runnibfg now sandalu tushan")
})