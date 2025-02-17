"use client"

import { Notification, useNotifications } from "@/hooks/use-notifications"
import { useEffect } from "react"

export default function AdminManageAnnouncementsPage() {
    const notifications = useNotifications()

    useEffect(() => {
        console.log("Notifications updated:", notifications) // Logging for debugging
    }, [notifications])

    return (
        <ul className="space-y-4">
            {notifications.map((notification: Notification, index) => (
                <li key={index} className="bg-white shadow rounded-lg p-4">
                    <p className="text-gray-800">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-2">{notification.timestamp.toLocaleString()}</p>
                </li>
            ))}
        </ul>
    )
}