

// Looking to send emails in production? Check out our Email API/SMTP product!
const { MailtrapClient } = require("mailtrap");

const dotenv =require("dotenv") ;
dotenv.config()


const ENDPOINT= process.env.MAILTRAP_ENDPOINT;

const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
  // endpoint: ENDPOINT,
  // testInboxId: 3366677,
  // accountId: 2166751,

});

const sender = {
  email: "hello@example.com",
  name: "sandalu",
};

const recipients = [
  {
    email: "sandaluthushan20@gmail.com",
  }
];



  module.exports={
    
    mailtrapClient,
    sender,
    
  }