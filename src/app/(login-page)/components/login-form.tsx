"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

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
        <div className="flex-1">
            <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">Welcome To FUC</h1>
            <p className="text-sm text-center text-zinc-400 dark:text-slate-400 font-semibold mb-6">
                FUC - Capstone management system for FPT university teachers and students
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="bg-zinc-200 dark:bg-zinc-600 border-zinc-200 dark:border-zinc-600 h-12 pt-6"
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
                        className="bg-zinc-200 dark:bg-zinc-600 border-zinc-200 dark:border-zinc-600 h-12 pt-6"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-600"
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
        </div>
    )
}