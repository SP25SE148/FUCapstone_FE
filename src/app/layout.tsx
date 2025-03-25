import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { SignalRProvider } from "@/contexts/signalR-context";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cookies } from "next/headers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "FUCapstone",
  description: "FPT University Capstone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider accessToken = {accessToken?.value}>
          <SignalRProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="fixed top-2 right-2 z-[45]">
                <ModeToggle />
              </div>
              {children}
              <Toaster duration={2000} />
            </ThemeProvider>
          </SignalRProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
