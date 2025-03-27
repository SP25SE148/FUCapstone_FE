import Config from "./components/config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConfigurationsPage() {
    return (
        <Card className="min-h-[calc(100vh-96px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Time Configurations</CardTitle>
                <CardDescription>Configure timing for your campus.</CardDescription>
            </CardHeader>
            <CardContent>
                <Config />
            </CardContent>
        </Card>
    )
}