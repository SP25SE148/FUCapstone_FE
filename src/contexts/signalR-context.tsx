"use client"

import type React from "react"
import * as signalR from "@microsoft/signalr"
import { createContext, useContext, useState, useEffect } from "react"

import { useAuth } from "./auth-context"

interface SignalRContextType {
    connection: signalR.HubConnection | null
    isConnecting: boolean
}

const SignalRContext = createContext<SignalRContextType | undefined>(undefined)

export const useSignalR = () => {
    const context = useContext(SignalRContext)
    if (context === undefined) {
        throw new Error("useSignalR must be used within a SignalRProvider")
    }
    return context
}

export const SignalRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null)
    const [isConnecting, setIsConnecting] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        const startConnection = async () => {
            if (!user) {
                if (connection) {
                    await connection.stop()
                    setConnection(null)
                    localStorage.removeItem("signalRConnectionEstablished")
                }
                return
            }

            const token = localStorage.getItem("token")
            if (!token) return

            const isConnectionEstablished = localStorage.getItem("signalRConnectionEstablished")
            if (isConnectionEstablished === "true" && connection) {
                // Kết nối đã được thiết lập, không cần tạo lại
                return
            }

            setIsConnecting(true)
            try {
                const newConnection = new signalR.HubConnectionBuilder()
                    .withUrl(`https://localhost:8000/notifications?access_token=${token}`, {
                        withCredentials: false
                    })
                    .withAutomaticReconnect()
                    .build()

                await newConnection.start()
                setConnection(newConnection)
                localStorage.setItem("signalRConnectionEstablished", "true")
            } catch (err) {
                console.error("SignalR Connection Error: ", err)
                localStorage.removeItem("signalRConnectionEstablished")
            } finally {
                setIsConnecting(false)
            }
        }

        startConnection()

        return () => {
            if (connection) {
                connection.stop()
                localStorage.removeItem("signalRConnectionEstablished")
            }
        }
    }, [user, connection]) // Added connection as a dependency

    // Thêm một effect riêng để xử lý reconnect khi mất kết nối
    useEffect(() => {
        if (connection) {
            connection.onclose(() => {
                console.log("SignalR connection closed")
                localStorage.removeItem("signalRConnectionEstablished")
                // Có thể thêm logic để thử kết nối lại ở đây nếu cần
            })
        }
    }, [connection])

    return (
        <SignalRContext.Provider value={{ connection, isConnecting }}>
            {children}
        </SignalRContext.Provider>
    );
}

