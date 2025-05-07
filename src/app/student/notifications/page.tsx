"use client";

import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getTimeElapsed } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useSignalR } from "@/contexts/signalR-context";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { connection, unreadedNoti } = useSignalR();
  const [notifications, setNotifications] = useState<any>();

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
  }, [connection?.state, !!unreadedNoti]);

  const handleNotificationClick = (type: string) => {
    switch (type) {
      case "FucTaskCreatedEvent":
        router.push("/student/workspace/tasks");
        break;

      case "ProjectProgressCreatedEvent":
        router.push("/student/workspace");
        break;

      case "TopicRequestStatusUpdatedEvent":
        router.push("/student/groups/my-topic");
        break;

      case "JoinGroupRequestStatusUpdatedEvent":
        router.push("/student/groups/my-request?tab=application-sent");
        break;

      case "JoinGroupRequestCreatedEvent":
        router.push("/student/groups/my-request?tab=application-received");
        break;

      case "GroupMemberCreatedEvent":
        router.push("/student/groups/my-request?tab=invitation-received");
        break;

      case "GroupMemberStatusUpdatedEvent":
        router.push("/student/groups/my-request?tab=invitation-sent");
        break;

      case "GroupStatusUpdatedEvent":
        router.push("/student/groups");
        break;
      
        case "ReviewCalendar":
        router.push("/student/reviews");
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
      {notifications && notifications?.length > 0
        ?
        <CardContent>
          <div className="space-y-2">
            {notifications?.map((notification: any) => (
              <div
                key={notification?.id}
                className="p-3 rounded-md border border-border hover:bg-accent/50 transition-all duration-20 cursor-pointer"
                onClick={() => handleNotificationClick(notification?.type)}
              >
                <div className="flex items-start gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm sm:text-base transition-all duration-200">
                      {notification?.content}
                    </p>
                    {/* <p className="font-semibold text-sm sm:text-base transition-all duration-200">
                      {notification?.type}
                    </p> */}
                    <p className="text-xs sm:text-sm font-medium text-primary transition-all duration-200">
                      {getTimeElapsed(notification?.createdDate)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        :
        <CardContent className="h-[calc(100vh-120px)] max-h-[calc(100vh-120px)]">
          <div className="h-full flex flex-col items-center justify-center gap-8">
            <Bell className="size-20 text-primary" />
            <div className="space-y-2">
              <p className="text-xl font-bold text-center text-primary">
                No notifications yet.
              </p>
              <p className="text-muted-foreground text-center text-sm">
                Please check again later.
              </p>
            </div>
          </div>
        </CardContent>}
    </Card>
  );
}
