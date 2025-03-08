import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GroupInfoPage() {
    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Group Information</CardTitle>
                <CardDescription>Detailed information about group members</CardDescription>
            </CardHeader>
            <CardContent>
            </CardContent>
        </Card>
    );
}