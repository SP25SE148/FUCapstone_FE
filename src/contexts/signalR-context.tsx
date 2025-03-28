"use client";

import * as signalR from "@microsoft/signalr";
import { createContext, useContext, useEffect, useState } from "react";
import { startSignalRConnection, stopSignalRConnection } from "@/utils/signalRService";

interface SignalRContextProps {
    connection: signalR.HubConnection | null;
    unreadedNoti: number;
    resetUnreadedNoti: () => void;
}

const SignalRContext = createContext<SignalRContextProps>({ connection: null, unreadedNoti: 0, resetUnreadedNoti: () => { } });

export const SignalRProvider = ({ children, accessToken = '' }: { children: React.ReactNode, accessToken?: string }) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [unreadedNoti, setUnreadedNoti] = useState<number>(0);

    const resetUnreadedNoti = () => {
        setUnreadedNoti(0)
    }

    useEffect(() => {
        // const token = localStorage.getItem("token");
        if (accessToken) {
            startSignalRConnection(accessToken).then(setConnection);
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

        const handleReceiveNewNotification = (message: string) => {
            console.log(`🔔 Bạn vừa có thêm thông báo chưa đọc: ${message}.`);
            setUnreadedNoti(prev => +prev + 1);
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
        <SignalRContext.Provider value={{ connection, unreadedNoti, resetUnreadedNoti }}>
            {children}
        </SignalRContext.Provider>
    );
};

export const useSignalR = () => useContext(SignalRContext);
