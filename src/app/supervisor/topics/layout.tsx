import React from "react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex w-full gap-4">
            <div className="w-64 h-auto bg-background border-2 rounded-lg shadow-lg flex items-center justify-center">sidebar</div>
            <div className="flex-1 bg-background border-2 rounded-lg shadow-lg flex items-center justify-center">
                {children}
            </div>
        </div>
    );
} 