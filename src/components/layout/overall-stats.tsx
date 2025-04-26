import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OverallStats({
    items,
}: {
    items?: {
        title: string;
        stat: string | number;
    }[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl">Overall</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 grid-cols-2 sm:grid-cols-4 ">
                {items?.map((item, index) => (
                    <div key={index}>
                        <p className="pb-2 tracking-tight text-sm font-medium">{item.title}</p>
                        <p className="text-2xl font-bold">{item.stat}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
