import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "bootstrap/dist/css/bootstrap.min.css";

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_12213", 
        "template_zgdddkb", 
        form.current, 
        {
          publicKey: "uxdriekI7IRCw5LYM",
        }
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Message sending failed.");
        }
      );
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header">
          <h3>Contact Us</h3>
        </div>
        <div className="card-body">
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-3">
              <label htmlFor="user_name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="user_name"
                name="user_name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="user_email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="user_email"
                name="user_email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="4"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
