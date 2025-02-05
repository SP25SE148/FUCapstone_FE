import Loginform from "./components/login-form";

export default function LoginPage() {
  return (
    <div className="h-screen max-h-screen flex items-center justify-center">
      <div className="h-[95%] w-[90%] flex items-center justify-center bg-[url(/images/fuhochiminh.webp)] bg-center bg-cover border-primary border-2 shadow-2xl rounded-2xl">
        <div className="h-[95%] max-h-[800px] w-[440px] max-w-[90%] p-12 border-primary border-2 bg-background/80 shadow-2xl rounded-2xl backdrop-blur-sm">
          <Loginform />
        </div>
      </div>
    </div>
  );
}