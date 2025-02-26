const items = [
  `import React, { useState } from 'react';

const T1 = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="parent-container">
      <style>
        {'
          .parent-container {
            position: relative;
            width: 100%;
            height: 100vh;
            perspective: 1000px;
            overflow: hidden;
          }
          .form-container {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            backface-visibility: hidden;
            transition: transform 0.6s;
          }
          .form-box {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 300px;
            text-align: center;
            animation: bounceIn 0.6s;
          }
          .form-box h2 {
            margin-bottom: 20px;
          }
          .form-box input {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .form-box button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .form-box button:hover {
            background-color: #0056b3;
          }
          .toggle-link {
            margin-top: 10px;
            color: #007bff;
            cursor: pointer;
            transition: color 0.3s;
          }
          .toggle-link:hover {
            color: #0056b3;
          }
          .sign-in-container {
            background-color: white;
            transform: \${isSignIn ? 'rotateY(0deg)' : 'rotateY(180deg)'};
          }
          .log-in-container {
            background-color: black;
            color: white;
            transform: \${isSignIn ? 'rotateY(-180deg)' : 'rotateY(0deg)'};
          }
          .log-in-container .form-box {
            background-color: #333;
          }
          .log-in-container .form-box input {
            background-color: #555;
            color: white;
            border: 1px solid #777;
          }
          .log-in-container .form-box button {
            background-color: #007bff;
          }
          .log-in-container .form-box button:hover {
            background-color: #0056b3;
          }
          .log-in-container .toggle-link {
            color: #007bff;
          }
          @keyframes bounceIn {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            60% {
              transform: scale(1.2);
              opacity: 1;
            }
            100% {
              transform: scale(1);
            }
          }
          @media (max-width: 768px) {
            .form-box {
              width: 90%;
            }
          }
        '}
      </style>
      <div className={\`form-container sign-in-container\`}>
        <div className="form-box">
          <h2>Sign In</h2>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign In</button>
          <div className="toggle-link" onClick={toggleForm}>
            Already have an account? Log In
          </div>
        </div>
      </div>
      <div className={\`form-container log-in-container\`}>
        <div className="form-box">
          <h2>Log In</h2>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Log In</button>
          <div className="toggle-link" onClick={toggleForm}>
            Don't have an account? Sign In
          </div>
        </div>
      </div>
    </div>
  );
};

export default T1;`,
  `import React, { useState } from 'react';

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
        {'
          .contact-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f0f0f0;
            padding: 20px;
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
        '}
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

export default T2;`,
  `import React, { useState } from 'react';

const T3 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    country: '',
    resume: null,
    coverLetter: null,
    termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="job-application-container">
      <style>
        {'
          .job-application-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #f0f0f0;
            padding: 20px;
            margin: 0;
          }
          .job-application-form {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 800px;
            text-align: center;
            animation: fadeIn 1s ease-in-out;
          }
          .job-application-form h2 {
            margin-bottom: 20px;
          }
          .job-application-form input,
          .job-application-form textarea,
          .job-application-form select {
            width: 100%;
            padding: 15px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
          }
          .job-application-form button {
            width: 100%;
            padding: 15px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
            font-size: 16px;
          }
          .job-application-form button:hover {
            background-color: #0056b3;
          }
          .job-application-form .checkbox-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
          }
          .job-application-form .checkbox-container input {
            margin-right: 10px;
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
          @media (max-width: 768px) {
            .job-application-form {
              padding: 20px;
            }
            .job-application-form input,
            .job-application-form textarea,
            .job-application-form select {
              padding: 10px;
              font-size: 14px;
            }
            .job-application-form button {
              padding: 10px;
              font-size: 14px;
            }
          }
        '}
      </style>
      <div className="job-application-form">
        <h2>Job Application</h2>
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
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Your Address"
            value={formData.address}
            onChange={handleChange}
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
            <option value="uk">UK</option>
            <option value="australia">Australia</option>
            <option value="other">Other</option>
          </select>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
          />
          <input
            type="file"
            name="coverLetter"
            onChange={handleChange}
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label htmlFor="termsAccepted">I accept the terms and conditions</label>
          </div>
          <button type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default T3;`
];

export default items;