import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_12213', 
        'template_zgdddkb', 
        form.current, {
        publicKey: 'uxdriekI7IRCw5LYM',
      })
      .then(
        (result) => {
          console.log('SUCCESS!',result.text);
          alert("sent sucessfully")
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert("sending failed")
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default ContactUs