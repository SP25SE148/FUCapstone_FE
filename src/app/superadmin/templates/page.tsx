"use client"

import { useSuperadminTemplate } from "@/contexts/superadmin/superadmin-template-context";

import ListFolder from "./components/list-folder-file";
import NewFolderFile from "./components/new-folder-file";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TemplatesPage() {
    const { templates } = useSuperadminTemplate();

    return (
        <Card className="min-h-[calc(100vh-96px)]">
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Templates</CardTitle>
                    <CardDescription>Repository of all templates</CardDescription>
                </CardHeader>
                <NewFolderFile />
            </div>
            <CardContent>
                <ListFolder list={templates || []} />
            </CardContent>
        </Card>
    );
}