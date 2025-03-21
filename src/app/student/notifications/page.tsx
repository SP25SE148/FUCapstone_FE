"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context";
import { useSignalR } from "@/contexts/signalR-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationsPage() {
    const { user } = useAuth();
    const { connection } = useSignalR();
    const [notifications, setNotifications] = useState<any>();

    useEffect(() => {
        if (!connection || connection.state !== "Connected") return;

        const handleReceiveMessage = (message: string) => {
            console.log("📩 Tin nhắn từ server:", message);
            setNotifications(message)
        };

        connection.invoke("GetNotifications");
        connection.on("ReceiveNotifications", handleReceiveMessage);

        return () => {
            connection.off("ReceiveNotifications", handleReceiveMessage);
        };
    }, [connection?.state]);

    return (
        <Card className="min-h-[calc(100vh-16px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Notifications</CardTitle>
                <CardDescription>All notifications for <strong className="text-primary">{user?.name}</strong></CardDescription>
            </CardHeader>
            <CardContent>
                {notifications?.map((notification: any) => (
                    <p key={notification?.id}>{notification?.content}</p>
                ))}
            </CardContent>
        </Card>
    );
};