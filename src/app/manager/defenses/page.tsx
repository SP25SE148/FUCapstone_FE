import { columns } from "./components/columns"
import { DataTable } from "@/components/ui/data-table"
import UploadDefenseCalendar from "./components/upload-defense-calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { defenseData } from "@/app/manager/defenses/data"

export default function DefensesPage() {
    return (
        <Card className="min-h-[calc(100vh-96px)]">
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Defenses</CardTitle>
                    <CardDescription>Defense schedule and information.</CardDescription>
                </CardHeader>
                <UploadDefenseCalendar />
            </div>
            <CardContent>
                <DataTable columns={columns} data={defenseData} />
            </CardContent>
        </Card>
    )
}