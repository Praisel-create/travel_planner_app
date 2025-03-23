import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userErrors = {}; // Validation
    if (!username) userErrors.username = "Username is required";
    if (!email) userErrors.email = "Email is required";
    if (!password) userErrors.password = "Password is required";

    setErrors(userErrors);

    if (Object.keys(userErrors).length > 0) return;

    console.log("Form submitted:", { username, email, password });
  };

  return (
    <div className="h-screen bg-cover bg-center bg-fixed flex justify-center items-center" 
         style={{ backgroundImage: "url('/images/background-1.jpg')" }}>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="text-center">
          <img className="h-24 w-24 rounded-full mx-auto mb-6" 
               src="https://www.kindpng.com/picc/m/106-1068191_transparent-avatar-clipart-hd-png-download.png" 
               alt="Profile" />
        </div>

        <div className="mb-4">
          <input 
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        <div className="mb-4">
          <input 
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <input 
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
