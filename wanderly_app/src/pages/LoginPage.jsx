import UserProfile from "../components/UserProfile";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/**Background video*/}
      <video 
        autoPlay
        loop
        muted
        playsInline
        className="absolute insert-0 w-full h-full object-cover z-0">
        <source src="/pictures/bg-video2.mp4"></source>
        </video>
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 rounded-xl ">
          <UserProfile editable={true} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
