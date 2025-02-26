import React, { useState } from 'react';

const T2 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-container">
      <style>
        {`
          .contact-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            background-color: #f0f0f0;
            overflow: hidden;
            position: relative;
          }
          .contact-form {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 500px;
            text-align: center;
            animation: fadeIn 1s ease-in-out;
            z-index: 1;
          }
          .contact-form h2 {
            margin-bottom: 20px;
          }
          .contact-form input,
          .contact-form textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .contact-form button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .contact-form button:hover {
            background-color: #0056b3;
          }
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .floating-icons {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
          }
          .floating-icon {
            position: absolute;
            width: 40px;
            height: 40px;
            background-color: #007bff;
            border-radius: 50%;
            animation: float 5s infinite;
          }
          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div className="contact-form">
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="floating-icons">
        <div className="floating-icon" style={{ top: '10%', left: '10%', animationDelay: '0s' }}></div>
        <div className="floating-icon" style={{ top: '20%', left: '80%', animationDelay: '1s' }}></div>
        <div className="floating-icon" style={{ top: '50%', left: '50%', animationDelay: '2s' }}></div>
        <div className="floating-icon" style={{ top: '70%', left: '20%', animationDelay: '3s' }}></div>
        <div className="floating-icon" style={{ top: '80%', left: '70%', animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

export default T2;
