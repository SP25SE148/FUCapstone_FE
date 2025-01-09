"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  // Không hiển thị Header nếu ở trang login
  if (pathname === "/") return null;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-2">
          <div className="text-purple-600 font-bold text-xl">FUC</div>
        </div>

        
        <div className="flex items-center space-x-4">
          <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25m0 0L18 7.5m-2.25-2.25L13.5 7.5m5.25 2.25a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </button>
          <Link href="/logout" className="text-sm text-gray-700">
            Log Out
          </Link>
        </div>
      </div>
    </header>
  );
}
