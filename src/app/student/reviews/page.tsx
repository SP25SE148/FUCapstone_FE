import { SupervisorTopicProvider } from "@/contexts/supervisor/supervisor-topic-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ReviewsPage() {
    return (
        <SupervisorTopicProvider>
            <Card className="min-h-[calc(100vh-60px)]">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Reviews</CardTitle>
                    <CardDescription>Reviews schedule and information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="border rounded-md overflow-hidden">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex-1">
                                    <div className="font-medium">SEP490</div>
                                    <div className="text-xs text-muted-foreground">Course</div>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">101</div>
                                    <div className="text-xs text-muted-foreground">Room</div>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">Review1</div>
                                    <div className="text-xs text-muted-foreground">Type</div>
                                </div>
                                <div className="flex-1 p-2 rounded-md">
                                    <div className="font-medium text-primary flex items-center">
                                        <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                                        21/04/2025
                                    </div>
                                    <div className="text-xs text-muted-foreground">Date</div>
                                </div>
                                <div className="flex-1">
                                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                                        Finished
                                    </Badge>
                                    <div className="text-xs text-muted-foreground">Status</div>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-md overflow-hidden">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex-1">
                                    <div className="font-medium">SEP490</div>
                                    <div className="text-xs text-muted-foreground">Course</div>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">101</div>
                                    <div className="text-xs text-muted-foreground">Room</div>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">Review 2</div>
                                    <div className="text-xs text-muted-foreground">Type</div>
                                </div>
                                <div className="flex-1 p-2 rounded-md">
                                    <div className="font-medium text-primary flex items-center">
                                        <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                                        28/04/2025
                                    </div>
                                    <div className="text-xs text-muted-foreground">Date</div>
                                </div>
                                <div className="flex-1">
                                    <Badge variant="destructive">Not yet</Badge>
                                    <div className="text-xs text-muted-foreground">Status</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </SupervisorTopicProvider>
    )
}