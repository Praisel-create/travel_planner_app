import { useState, useEffect } from 'react';

const UserProfile = ({ editable = false, isLoginPage = false, onUserChange }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    profilePic: "https://www.kindpng.com/picc/m/106-1068191_transparent-avatar-clipart-hd-png-download.png",
  });

  const [password, setPassword] = useState('');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedPassword = localStorage.getItem("password");
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  // Save user data to localStorage
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };
    
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    if (onUserChange) onUserChange(updatedUser);
  };

  // Save password separately
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    localStorage.setItem("password", e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const updatedUser = { ...user, profilePic: event.target.result };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        if (onUserChange) onUserChange(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-sm w-96">
      {/* Profile Picture with Upload */}
      <div className="relative">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
        />
        {editable && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        )}
      </div>

      {/* Username Field */}
      <div className="w-full">
        <label className="block text-gray-600 text-sm font-medium">Username</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full p-3 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter username"
        />
      </div>

      {/* Email Field */}
      <div className="w-full">
        <label className="block text-gray-600 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full p-3 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter email"
        />
      </div>

      {/* Password Field */}
      {editable && (
        <div className="w-full">
          <label className="block text-gray-600 text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-3 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter password"
          />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
