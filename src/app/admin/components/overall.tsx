"use client"

import { useAuth } from "@/contexts/auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Overall({
    items,
    isLoading
}: {
    items?: {
        title: string;
        value: string | number;
    }[];
    isLoading: boolean
}) {
    const { user } = useAuth();

    return isLoading
        ?
        <Overall.Skeleton />
        :
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl">Overall</CardTitle>
                <CardDescription>Campus {user?.CampusId}</CardDescription>
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
        ;
}

Overall.Skeleton = () => {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Skeleton className="mb-2 h-7 w-52" />
                    <Skeleton className="h-8 w-24" />
                </div>
                <div>
                    <Skeleton className="mb-2 h-7 w-52" />
                    <Skeleton className="h-8 w-24" />
                </div>
                <div>
                    <Skeleton className="mb-2 h-7 w-52" />
                    <Skeleton className="h-8 w-24" />
                </div>
                <div>
                    <Skeleton className="mb-2 h-7 w-52" />
                    <Skeleton className="h-8 w-24" />
                </div>
            </CardContent>
        </Card>
    )
};
