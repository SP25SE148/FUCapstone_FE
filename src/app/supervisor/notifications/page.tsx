"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useSignalR } from "@/contexts/signalR-context";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTimeElapsed } from "@/lib/utils";

export default function NotificationsPage() {
  const { user } = useAuth();
  const { connection, unreadedNoti } = useSignalR();
  const [notifications, setNotifications] = useState<any>();
  const router = useRouter(); 

  useEffect(() => {
    if (!connection || connection.state !== "Connected") return;

    const handleReceiveMessage = (message: string) => {
      console.log("📩 Tin nhắn từ server:", message);
      setNotifications(message);
    };

    connection.invoke("GetNotifications");
    connection.on("ReceiveNotifications", handleReceiveMessage);

    return () => {
      connection.off("ReceiveNotifications", handleReceiveMessage);
    };
  }, [connection, unreadedNoti]);

  const handleNotificationClick = (type: string) => {
    switch (type) {
      case "ReAssignAppraisalTopicEvent":
      case "AssignedSupervisorForAppraisalEvent":
      case "AssignedAvailableSupervisorForAppraisalEvent":
        router.push("/supervisor/topics/appraisal");
        break;

      case "TopicApprovedEvent":
      case "TopicStatusUpdatedEvent":
      case "NewSupervisorAssignedForTopicEvent":  
        router.push("/supervisor/topics");
        break;

      case "TopicRequestCreatedEvent":
        router.push("/supervisor/topics/my-request");
        break;

      default:
        console.warn("No route defined for this notification type:", type);
    }
  };

  return (
    <Card className="min-h-[calc(100vh-16px)]">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl text-primary">
          Notifications
        </CardTitle>
        <CardDescription>
          All notifications for{" "}
          <strong className="text-primary">{user?.name}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {notifications?.map((notification: any) => (
              <div
                key={notification?.id}
                className="p-3 rounded-md border border-border hover:bg-accent/50 transition-all duration-200 group cursor-pointer"
                onClick={() => handleNotificationClick(notification?.type)}
              >
                <div className="flex items-start gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-semibold transition-all duration-200">
                      {notification?.content}
                    </p>
                    <p className="font-semibold transition-all duration-200">
                      {notification?.type}
                    </p>
                    <p className="text-sm font-medium text-primary  transition-all duration-200">
                      {getTimeElapsed(notification?.createdDate)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          {!notifications ||
            (notifications.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <p>No notifications yet</p>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
