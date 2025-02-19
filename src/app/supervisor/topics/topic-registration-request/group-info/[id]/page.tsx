import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GroupInfoPage() {
    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl">Group Information</CardTitle>
                <CardDescription>Detailed information about group members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <section className="space-y-2">
                    <h3 className="font-bold">General information</h3>
                    <div className="grid grid-cols-3 pl-2">
                        <p><span className="text-muted-foreground text-sm">Capstone:</span> <strong>SEP490</strong></p>
                        <p><span className="text-muted-foreground text-sm">Major:</span> <strong>SE</strong></p>
                        <p><span className="text-muted-foreground text-sm">Group code:</span> <strong>GSP25SE41</strong></p>
                    </div>
                </section>
                <section>
                    <h3 className="font-bold">Member(s)</h3>
                    <div>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
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
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                    <div className="grid grid-cols-3">
                                        <p><span className="text-muted-foreground">Capstone:</span> <strong>SEP490</strong></p>
                                        <p><span className="text-muted-foreground">Major:</span> <strong>SE</strong></p>
                                        <p><span className="text-muted-foreground">Skills:</span> <strong>Full stack</strong></p>
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <p><span className="text-muted-foreground">Capstone:</span> <strong>SEP490</strong></p>
                                        <p><span className="text-muted-foreground">Major:</span> <strong>SE</strong></p>
                                        <p><span className="text-muted-foreground">Skills:</span> <strong>Full stack</strong></p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
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
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                    <div className="grid grid-cols-3">
                                        <p><span className="text-muted-foreground">Capstone:</span> <strong>SEP490</strong></p>
                                        <p><span className="text-muted-foreground">Major:</span> <strong>SE</strong></p>
                                        <p><span className="text-muted-foreground">Skills:</span> <strong>Full stack</strong></p>
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <p><span className="text-muted-foreground">Capstone:</span> <strong>SEP490</strong></p>
                                        <p><span className="text-muted-foreground">Major:</span> <strong>SE</strong></p>
                                        <p><span className="text-muted-foreground">Skills:</span> <strong>Full stack</strong></p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
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
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                    <div className="grid grid-cols-3">
                                        <p><span className="text-muted-foreground">Capstone:</span> <strong>SEP490</strong></p>
                                        <p><span className="text-muted-foreground">Major:</span> <strong>SE</strong></p>
                                        <p><span className="text-muted-foreground">Skills:</span> <strong>Full stack</strong></p>
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <p><span className="text-muted-foreground">Capstone:</span> <strong>SEP490</strong></p>
                                        <p><span className="text-muted-foreground">Major:</span> <strong>SE</strong></p>
                                        <p><span className="text-muted-foreground">Skills:</span> <strong>Full stack</strong></p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
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
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                    <div className="grid grid-cols-3">
                                        <p><span className="text-muted-foreground">Capstone:</span> <strong>SEP490</strong></p>
                                        <p><span className="text-muted-foreground">Major:</span> <strong>SE</strong></p>
                                        <p><span className="text-muted-foreground">Skills:</span> <strong>Full stack</strong></p>
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <p><span className="text-muted-foreground">Capstone:</span> <strong>SEP490</strong></p>
                                        <p><span className="text-muted-foreground">Major:</span> <strong>SE</strong></p>
                                        <p><span className="text-muted-foreground">Skills:</span> <strong>Full stack</strong></p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>
            </CardContent>
        </Card>
    )
}