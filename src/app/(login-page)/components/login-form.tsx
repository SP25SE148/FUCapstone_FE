"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, EyeOff, Globe } from 'lucide-react';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Loginform() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [focusedInput, setFocusedInput] = useState<"email" | "password" | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your login logic here
        router.push('/superadmin');
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-20">
                <strong className="font-extrabold text-2xl">FUC</strong>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>VIETNAM</span>
                    <Globe className="w-4 h-4" />
                </div>
            </div>
            <div className="mb-6 flex flex-col gap-6 items-center text-center">
                <h1 className="text-2xl font-bold">Welcome To FUC</h1>
                <p className="text-sm font-semibold text-muted-foreground">
                    FUC - Capstone management system for FPT university teachers and students
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
                        id="email"
                        type="email"
                        value={email}
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 pt-6"
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
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 pt-6"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1.5"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </Button>
                </div>

                <div className="flex justify-center items-center">
                    <Button
                        className="w-14 h-14 rounded-2xl mt-6"
                        size="icon"
                        type="submit"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </Button>
                </div>
            </form>
            <p className="text-sm text-center text-muted-foreground">
                Developed by FUC team
            </p>
        </div>
    )
}