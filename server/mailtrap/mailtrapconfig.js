

// Looking to send emails in production? Check out our Email API/SMTP product!
const { MailtrapClient } = require("mailtrap");

const dotenv =require("dotenv") ;
dotenv.config()

const TOKEN =process.env.MAILTRAP_TOKEN;
const ENDPOINT= process.env.MAILTRAP_ENDPOINT;

const mailtrapClient = new MailtrapClient({
  token: TOKEN,
  endpoint: ENDPOINT,
  testInboxId: 3366677,
  accountId: 2166751,

});

const sender = {
  email: "hello@example.com",
  name: "Mailtrap company",
};
const recipients = [
  {
    email: "sandaluthushan20@gmail.com",
  }
];

mailtrapClient.testing
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);

  module.exports={
    mailtrapClient,
    sender,
  }