"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Request {
  id: string
  type: "sent" | "received"
  from: string
  to: string
  status: "processing" | "accepted" | "rejected"
  date: string
}

const requests: Request[] = [
  {
    id: "1",
    type: "sent",
    from: "You",
    to: "Mai Tan Phuc",
    status: "processing",
    date: "16/01/2025 - 23:01:20",
  },
  {
    id: "2",
    type: "sent",
    from: "You",
    to: "Le Trung Kien",
    status: "accepted",
    date: "16/01/2025 - 23:01:20",
  },
  {
    id: "3",
    type: "sent",
    from: "You",
    to: "Nguyen Dinh Hoang Huy",
    status: "rejected",
    date: "16/01/2025 - 23:01:20",
  },
  {
    id: "6",
    type: "received",
    from: "Nguyen Duc Thang(SE173512)",
    to: "You",
    status: "processing",
    date: "16/01/2025 - 23:01:20",
  },
]

export function ListRequest() {
  const sentRequests = requests.filter((r) => r.type === "sent")
  const receivedRequests = requests.filter((r) => r.type === "received")

  const getStatusColor = (status: Request["status"]) => {
    switch (status) {
      case "processing":
        return "text-blue-500"
      case "accepted":
        return "text-green-500"
      case "rejected":
        return "text-red-500"
      default:
        return ""
    }
  }

  return (
    <div>
      <CardHeader>
        <h2 className="text-2xl font-semibold">List Request</h2>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="my-request">
          <TabsList className="mb-4">
            <TabsTrigger value="my-request">My Request</TabsTrigger>
            <TabsTrigger value="group-request">Groups I&apos;ve Request</TabsTrigger>
          </TabsList>
          <TabsContent value="my-request">
            <div className="rounded-lg border">
              <div className="grid grid-cols-[1fr,100px] gap-4 p-4 font-medium border-b">
                <div>Request</div>
                <div>Status</div>
              </div>
              <div className="overflow-y-auto max-h-[440px]">
                {sentRequests.map((request) => (
                  <div key={request.id} className="grid grid-cols-[1fr,100px] gap-4 p-4 items-center">
                    <div>
                      <p>Request to join the group to {request.to}</p>
                      <p className="text-sm text-muted-foreground">{request.date}</p>
                    </div>
                    <div className={getStatusColor(request.status)}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="group-request">
            <div className="rounded-lg border">
              <div className="grid grid-cols-[1fr,200px] gap-4 p-4 font-medium border-b">
                <div>Request</div>
                <div>Actions</div>
              </div>
              <div className="overflow-y-auto max-h-[440px]">
                {receivedRequests.map((request) => (
                  <div key={request.id} className="grid grid-cols-[1fr,200px] gap-4 p-4 items-center">
                    <div>
                      <p>{request.from} invited you to join their group</p>
                      <p className="text-sm text-muted-foreground">{request.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="default">
                        Accept
                      </Button>
                      <Button variant="outline" className="border border-primary text-primary">
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  )
}

