import React, { useState } from 'react';

const T1 = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="parent-container">
      <style>
        {`
          .parent-container {
            position: relative;
            width: 100%;
            height: 100%;
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
            width: 90%;
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
            transform: ${isSignIn ? 'rotateY(0deg)' : 'rotateY(180deg)'};
          }
          .log-in-container {
            background-color: black;
            color: white;
            transform: ${isSignIn ? 'rotateY(-180deg)' : 'rotateY(0deg)'};
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
        `}
      </style>
      <div className={`form-container sign-in-container`}>
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
      <div className={`form-container log-in-container`}>
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

export default T1;