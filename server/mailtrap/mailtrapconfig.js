const {MailtrapClient} =require("mailtrap");


const dotenv = require("dotenv");

const { model } = require( "mongoose");

dotenv.config()


const ENDPOINT= process.env.MAILTRAP_ENDPOINT;

// const ENDPOINT = "https://send.api.mailtrap.io/";

 const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
//   endpoint: ENDPOINT,

});


 const sender = {
  email: "hello@demomailtrap.com",
  name: "sandalu",
};



// it 
const recipients = [
  {
    email: "sandaluthushan20@gmail.com",
  }
];




// Client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     html: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
module.exports ={sender,mailtrapClient}