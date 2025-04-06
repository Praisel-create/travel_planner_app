import { useState } from 'react';
import UserProfile from "../components/UserProfile";
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background video */}
      <video 
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/src/pictures/bg-video2.mp4" type="video/mp4" />
      </video>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 rounded-xl space-y-4">
          <UserProfile editable={true} isLoginPage={true} />
          
          {/* Login Button with Link */}
          <Link to="/search-page">
            <button
              disabled={isLoading}
              className={`w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
