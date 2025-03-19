import ListRequest from "./list-request";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopicRegistrationRequestTable() {
    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Topic Registration Request</CardTitle>
                <CardDescription>List information of topic registration request from groups</CardDescription>
            </CardHeader>
            <ListRequest />
        </Card>
    );
}
