import Images from "./components/images";
import Loginform from "./components/login-form";

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-muted">
      <div className="w-[90%] max-w-[1200px] h-[90%] max-h-[800px] border-primary border-2 bg-background shadow-2xl rounded-2xl flex">
        {/* Left side - Login Form */}
        <div className="w-[440px] p-12 flex flex-col rounded-2xl">
          <Loginform />
        </div>

        {/* Right side - Background Image */}
        <div className="flex-1 p-2 relative overflow-hidden">
          <Images />
        </div>
      </div>
    </div>
  );
}