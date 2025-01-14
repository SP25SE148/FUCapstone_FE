import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Overall({
    items,
}: {
    items?: {
        title: string;
        value: string | number;
    }[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl">Overall</CardTitle>
                <CardDescription>Campus Hồ Chí Minh</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {items?.map((item, index) => (
                    <div key={index}>
                        <p className="pb-2 tracking-tight text-sm font-medium">{item.title}</p>
                        <p className="text-2xl font-bold">{item.value}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
