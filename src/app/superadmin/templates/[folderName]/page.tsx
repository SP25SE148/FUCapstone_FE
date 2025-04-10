"use client"

import { useEffect } from "react"
import { Undo2 } from "lucide-react"
import { useParams, useSearchParams, useRouter } from "next/navigation"

import { useSuperadminTemplate } from "@/contexts/superadmin/superadmin-template-context"

import ListFolder from "../components/list-folder-file"
import NewFolderFile from "../components/new-folder-file"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FolderPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const { subFolder, getTemplateById } = useSuperadminTemplate()

    useEffect(() => {
        getTemplateById(searchParams.get('folderId') || "");
    }, []);

    return (
        <Card className="min-h-[calc(100vh-96px)]">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Button className="ml-6" size={"icon"} variant={"outline"}
                        onClick={() => router.back()}
                    >
                        <Undo2 />
                    </Button>
                    <CardHeader>
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">{params.folderName}</CardTitle>
                        <CardDescription>List subfolders, files in <span className="text-primary font-semibold">{params.folderName}</span></CardDescription>
                    </CardHeader>
                </div>
                <NewFolderFile />
            </div>
            <CardContent>
                <ListFolder list={subFolder || []} />
            </CardContent>
        </Card>
    )
}