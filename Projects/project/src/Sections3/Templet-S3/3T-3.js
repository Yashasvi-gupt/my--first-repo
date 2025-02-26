import React, { useState } from 'react';

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
        {`
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
        `}
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
          <input
            type="text"
            name="country"
            placeholder="Your Country"
            value={formData.country}
            onChange={handleChange}
          />
          <div className="file-upload">
            <label htmlFor="resume">Upload Resume:</label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
            />
          </div>
          <div className="file-upload">
            <label htmlFor="coverLetter">Upload Cover Letter:</label>
            <input
              type="file"
              name="coverLetter"
              id="coverLetter"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
            />
          </div>
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

export default T3;