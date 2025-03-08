import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectProgressPage() {
    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Project Progress</CardTitle>
                <CardDescription>Project progress of group <span className="text-primary font-semibold">GSP25SE41</span></CardDescription>
            </CardHeader>
            <CardContent>
            </CardContent>
        </Card>
    )
}