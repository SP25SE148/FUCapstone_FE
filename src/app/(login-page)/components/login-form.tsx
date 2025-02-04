"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Globe, Loader2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function Loginform() {
  const router = useRouter();
  const { login, user, token } = useAuth();

  const logo = "/images/original-logo.png";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"email" | "password" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    try {
      setIsLoading(true)
      await login(email, password);
      toast.success("Login successfully", { description: "Welcome to FUC" })
    } catch (error) {
      toast.error(`${error}`)
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (user || token) {
      switch (user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
        case "SuperAdmin":
          router.push("/superadmin");
          break;
        case "Admin":
          router.push("/admin");
          break;
        case "Manager":
          router.push("/manager");
          break;
        case "Supervisor":
          router.push("/supervisor/home");
          break;
        case "Student":
          router.push("/student/home");
          break;
        default:
          break;
      }
    }
  }, [user, token, router]);

  if (user) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <h2 className="text-xl font-semibold">Redirecting</h2>
        <p className="text-foreground mt-2">Please wait a moment...</p>
      </div>
    );
  } else {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-20">
          <Image src={logo} alt="logo" width={60} height={60} style={{ width: "auto", height: "auto" }} />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>VIETNAM</span>
            <Globe className="w-4 h-4" />
          </div>
        </div>
        <div className="mb-6 flex flex-col gap-6 items-center text-center">
          <h1 className="text-2xl font-bold">Welcome To FUC</h1>
          <p className="text-sm font-semibold text-muted-foreground">
            FUC - Capstone management system for FPT university teachers and
            students
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          {/* EMAIL */}
          <div className="relative">
            <Label
              htmlFor="email"
              className={`absolute left-4 top-4 text-foreground transition-all duration-200 ${focusedInput === "email" || email
                ? "-translate-y-3 -translate-x-2 scale-90 text-muted-foreground text-xs"
                : ""
                }`}
            >
              EMAIL
            </Label>
            <Input
              required
              id="email"
              type="email"
              value={email}
              disabled={isLoading}
              className="h-12 pt-6"
              onBlur={() => setFocusedInput(null)}
              onFocus={() => setFocusedInput("email")}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Label
              htmlFor="password"
              className={`absolute left-4 top-4 text-foreground transition-all duration-200 ${focusedInput === "password" || password
                ? "-translate-y-3 -translate-x-2 scale-90 text-muted-foreground text-xs"
                : ""
                }`}
            >
              PASSWORD
            </Label>
            <Input
              required
              id="password"
              value={password}
              disabled={isLoading}
              className="h-12 pt-6"
              onBlur={() => setFocusedInput(null)}
              type={showPassword ? "text" : "password"}
              onFocus={() => setFocusedInput("password")}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1.5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </Button>
          </div>

          <div className="flex justify-center items-center">
            <Button
              className="w-14 h-14 rounded-2xl mt-6"
              size="icon"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight className="w-6 h-6" />}
            </Button>
          </div>
        </form>
        <p className="text-sm text-center text-muted-foreground">
          Developed by FUC team
        </p>
      </div>
    );
  }
}
