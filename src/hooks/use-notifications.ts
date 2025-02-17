"use client"

import { useSignalR } from "@/contexts/signalR-context"
import { useState, useEffect, useCallback } from "react"

export interface Notification {
  id: string
  message: string
  timestamp: Date
}

const STORAGE_KEY = "app_notifications"

export const useNotifications = () => {
  const { connection } = useSignalR()
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    // Khởi tạo state từ localStorage nếu có
    const savedNotifications = localStorage.getItem(STORAGE_KEY)
    return savedNotifications
      ? JSON.parse(savedNotifications).map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }))
      : []
  })

  // Lưu notifications vào localStorage mỗi khi nó thay đổi
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  }, [notifications])

  const addNotification = useCallback((message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date(),
    }
    setNotifications((prev) => {
      const updated = [newNotification, ...prev]
      // Giới hạn số lượng thông báo được lưu trữ (ví dụ: 50)
      return updated.slice(0, 50)
    })
  }, [])

  useEffect(() => {
    if (connection) {
      connection.on("ReceiveAllNotifications", (message: string) => {
        console.log("Received new notification:", message)
        addNotification(message)
      })
    }

    return () => {
      if (connection) {
        connection.off("ReceiveNotification")
      }
    }
  }, [connection, addNotification])

  return notifications
}

