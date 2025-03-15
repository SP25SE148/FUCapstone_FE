import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GroupTasksPage() {
    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Group Tasks</CardTitle>
                <CardDescription>List of group tasks during project implementation.</CardDescription>
            </CardHeader>
        </Card>
    )
}