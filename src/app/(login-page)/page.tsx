
import { Globe } from "lucide-react";
import Images from "./components/images";
import Loginform from "./components/login-form";

export default function LoginPage() {
  return (
    <div className="h-screen bg-primary/40 flex items-center justify-center"> {/* Thẻ div ngoài */}
      <div className="w-[90%] max-w-[1200px] h-[90%] max-h-[800px] bg-zinc-50 shadow-lg rounded-2xl flex"> {/* Thẻ div trong */}
        {/* Left side - Login Form */}
        <div className="w-[440px] bg-zinc-50 p-12 flex flex-col rounded-2xl">
          <div className="flex items-center justify-between mb-20">
            <strong className="font-extrabold text-2xl">FUC</strong>
            <div className="flex items-center gap-2 text-sm">
              <span>VIETNAM</span>
              <Globe className="w-4 h-4" />
            </div>
          </div>

          <Loginform />

          <p className="text-sm text-center text-zinc-400">
            Developed by FUC team
          </p>
        </div>

        {/* Right side - Background Image */}
        <div className="flex-1 relative overflow-hidden">
          <Images />
        </div>
      </div>
    </div>
  );
}