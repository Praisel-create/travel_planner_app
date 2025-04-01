import { useEffect, useState } from 'react';

const UserProfile = ({ editable = false, isLoginPage = false }) => {
  // Initialize state with localStorage or defaults
  const [user, setUser] = useState(() => {
    if (isLoginPage) return {
      name: '',
      email: '',
      profilePic: "https://www.kindpng.com/picc/m/106-1068191_transparent-avatar-clipart-hd-png-download.png"
    };
    
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      profilePic: "https://www.kindpng.com/picc/m/106-1068191_transparent-avatar-clipart-hd-png-download.png"
    };
  });

  const [password, setPassword] = useState('');

  // Save to localStorage when not on login page
  useEffect(() => {
    if (!isLoginPage) {
      localStorage.setItem('user', JSON.stringify(user, null, 2)); // Pretty-print JSON
    }
  }, [user, isLoginPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-sm w-96">
      {/* Profile Picture */}
      <div className="relative">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
        />
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

      {/* Password Field (not stored) */}
      {editable && (
        <div className="w-full">
          <label className="block text-gray-600 text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter password"
          />
        </div>
      )}

      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        {editable ? 'Save Profile' : 'Login'}
      </button>
    </div>
  );
};

export default UserProfile;