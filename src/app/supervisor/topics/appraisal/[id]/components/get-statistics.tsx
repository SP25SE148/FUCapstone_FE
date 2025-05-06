"use client"

import { useState } from "react";
import { Eye } from "lucide-react";
import { useParams } from "next/navigation";

import { getDate } from "@/lib/utils";
import { Statistic } from "@/types/types";
import { useSupervisorTopicAppraisal } from "@/contexts/supervisor/supervisor-topic-appraisal-context";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function GetStatistics() {
    const { getStatistics } = useSupervisorTopicAppraisal();
    const params = useParams();
    const id: string = String(params.id);
    const [open, setOpen] = useState<boolean>(false);
    const [statistics, setStatistics] = useState<Statistic[]>([]);

    const handleGetStatistics = async () => {
        setOpen(true);
        const res = await getStatistics(id)
        setStatistics(res)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={handleGetStatistics}>
                    <Eye />
                    Statistics
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full">
                <DialogHeader>
                    <DialogTitle>Statistics</DialogTitle>
                    <DialogDescription>All statistic of topic</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 p-2 w-full max-h-[540px] overflow-y-auto">
                    {statistics?.map((stat, index) => (
                        <div key={index} className="bg-white shadow rounded-xl p-2">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold leading-none tracking-tight">Statistic #{index + 1}</h2>
                                <span className="text-sm text-gray-500">{getDate(stat?.createdDate)}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
                                <div>
                                    <p><strong>Over 60% Ratio:</strong> {stat.over60Ratio}</p>
                                    <p><strong>Over 80% Ratio:</strong> {stat.over80Ratio}</p>
                                </div>
                                <div>
                                    <p><strong>Processed By:</strong> {stat.processedBy}</p>
                                    <p><strong>Status:</strong> {stat.statusSemantic}</p>
                                </div>
                            </div>

                            {stat?.analysises && <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left text-gray-700 border">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 border">Topic ID</th>
                                            <th className="px-4 py-2 border">English Name</th>
                                            <th className="px-4 py-2 border">Similarity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stat?.analysises?.map((item, i) => (
                                            <tr key={i} className="border-t hover:bg-gray-50">
                                                <td className="px-4 py-2 border">{item.analysisTopicId}</td>
                                                <td className="px-4 py-2 border">{item.englishName}</td>
                                                <td className="px-4 py-2 border">{(item.similarity).toFixed(2)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}