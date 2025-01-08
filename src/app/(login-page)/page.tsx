import Images from "./components/images";

import { Globe } from "lucide-react";
import Loginform from "./components/login-form";

export default function LoginPage() {
  return (
    <main className="h-screen flex select-none">
      {/* Left side - Login Form */}
      <div className="w-[440px] bg-zinc-50 p-12 flex flex-col">
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
        <div
          className="absolute top-0 bottom-0 w-full flex items-center justify-center text-6xl text-slate-800 font-bold italic backdrop-opacity-10 backdrop-invert bg-white/20"
        >
          FPT University Capstone
        </div>
      </div>
    </main >
  );
}