import { SupervisorTopicProvider } from "@/contexts/supervisor/supervisor-topic-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewsCalendarsPage() {
    return (
        <SupervisorTopicProvider>
            <Card className="min-h-[calc(100vh-60px)]">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Reviews</CardTitle>
                    <CardDescription>Reviews schedule and information.</CardDescription>
                </CardHeader>
                <CardContent>
                </CardContent>
            </Card>
        </SupervisorTopicProvider>
    )
}