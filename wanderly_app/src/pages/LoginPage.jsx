import { useState } from 'react';
import UserProfile from "../components/UserProfile";
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background video - responsive sizing */}
      <video 
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/src/pictures/bg-video2.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <img src="/src/pictures/bg-fallback.jpg" alt="Background" className="w-full h-full object-cover" />
      </video>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-6 sm:p-8 md:p-10 rounded-xl space-y-4 bg-white/90 backdrop-blur-sm shadow-xl">
       
          <div className="mb-6 sm:mb-8">
            <UserProfile editable={true} isLoginPage={true} />
          </div>
          
          <Link to="/search-page" className="w-full">
            <button
              disabled={isLoading}
              className={`w-full bg-blue-500 text-white py-2 sm:py-3 md:py-3 rounded-lg hover:bg-blue-600 transition ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              } text-sm sm:text-base md:text-lg`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : 'Login'}
            </button>
          </Link>

          <div className="pt-4 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700">
                Forgot password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;