"use client"

import ListFolder from "./components/list-folder";
import { SuperadminTemplateProvider } from "@/contexts/superadmin/superadmin-template-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TemplatesPage() {
    return (
        <SuperadminTemplateProvider>
            <Card>
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl">Templates</CardTitle>
                    <CardDescription>Repository of all templates</CardDescription>
                </CardHeader>
                <CardContent>
                    <ListFolder />
                </CardContent>
            </Card>
        </SuperadminTemplateProvider>
    );
}