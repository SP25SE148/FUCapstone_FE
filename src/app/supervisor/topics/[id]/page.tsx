import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopicDetailsPage() {
    return (
        <Card >
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl">Capstone management system for FPT university teachers and students</CardTitle>
                <CardDescription>Hệ thống quản lý đồ án cho giảng viên và sinh viên của trường đại học FPT</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-3">
                    <p><span className="text-muted-foreground">Capstone:</span> <strong>SEP490</strong></p>
                    <p><span className="text-muted-foreground">Topic code:</span> <strong>SP25SE148</strong></p>
                    <p><span className="text-muted-foreground">Abbreviations:</span> <strong>FUC</strong></p>
                </div>
                <div>
                    <p className="text-muted-foreground">Description:</p>
                    <p className="p-4 font-bold text-justify italic">
                        FUC is designed to solve the challenges that FPT students face by providing
                        an intuitive and powerful platform specifically designed for students to
                        learn all the information and requirements of the subject, and search for
                        information about the instructor. Mentors can manage their groups in charge,
                        assign tasks, exchange information and schedule meetings with groups
                        In addition, FUC also provides students with a number of features to help
                        students stay organized and on track, features such as task lists, calendars,
                        and progress tracking will enable students to monitor their project's progress
                        and identify potential roadblocks; scheduling to simplify the process of
                        booking meetings with advisors and team members,students can easily propose
                        meeting times and receive notifications about upcoming meetings.
                    </p>
                </div>
                <div>
                    <p className="text-muted-foreground">Supervisor(s):</p>
                    <div className="p-4 space-y-4">
                        <div className="flex gap-4">
                            <Avatar className="h-12 w-12 rounded-lg">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">Lê Nguyễn Sơn Vũ - VuLNS</p>
                                <p className="text-sm text-muted-foreground">vulns@fe.edu.vn</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Avatar className="h-12 w-12 rounded-lg">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">Lê Nguyễn Sơn Vũ - VuLNS</p>
                                <p className="text-sm text-muted-foreground">vulns@fe.edu.vn</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Button
                        variant={"outline"}
                        className="h-12 border-primary text-primary hover:bg-primary hover:text-white"
                    >
                        <Download />
                        Document
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}