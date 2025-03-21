"use client";

import * as signalR from "@microsoft/signalr";
import { createContext, useContext, useEffect, useState } from "react";
import { startSignalRConnection, stopSignalRConnection } from "@/utils/signalRService";

interface SignalRContextProps {
    connection: signalR.HubConnection | null;
    unreadedNoti: number
}

const SignalRContext = createContext<SignalRContextProps>({ connection: null, unreadedNoti: 0 });

export const SignalRProvider = ({ children }: { children: React.ReactNode }) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [unreadedNoti, setUnreadedNoti] = useState<number>(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            startSignalRConnection(token).then(setConnection);
        }

        return () => {
            stopSignalRConnection();
        };
    }, []);

    useEffect(() => {
        if (!connection || connection.state !== "Connected") return;

        const handleNotificationCount = (count: number) => {
            console.log(`🔔 Bạn có ${count} thông báo chưa đọc.`);
            setUnreadedNoti(count);
        };

        const handleReceiveNewNotification = (count: number) => {
            console.log(`🔔 Bạn vừa có thêm ${count} thông báo chưa đọc.`);
            setUnreadedNoti(prev => +prev + count);
        };

        // Register new handlers
        connection.on("NumberOfUnreadedNotifications", handleNotificationCount)
        connection.on("ReceiveNewNotification", handleReceiveNewNotification)

        return () => {
            // Fix: Use connection.off for both handlers in cleanup
            connection.off("NumberOfUnreadedNotifications", handleNotificationCount)
            connection.off("ReceiveNewNotification", handleReceiveNewNotification)
        }
    }, [connection, connection?.state]); // Chạy lại khi `connection` thay đổi

    return (
        <SignalRContext.Provider value={{ connection, unreadedNoti }}>
            {children}
        </SignalRContext.Provider>
    );
};

export const useSignalR = () => useContext(SignalRContext);
