import { z } from "zod";
import { MailPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStudentGroup } from "@/contexts/student/student-group-context";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
    email: z.string()
        .email("Email is not in correct format.")
        .max(100, "Email is too long."),
});

export default function InviteMember() {
    const { inviteMember } = useStudentGroup();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res: any = await inviteMember({
            "memberEmailList": [values.email]
        });
        if (res?.isSuccess) {
            form.reset();
        }
    }

    return (
        <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
                <MailPlus className="size-4 text-primary" />
                Invite Member(s)
            </h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex w-full space-x-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem
                                    className="flex-1"
                                >
                                    <FormControl>
                                        <Input
                                            className="flex-1"
                                            placeholder="Enter the email of the student you want to invite" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant={"outline"} className="border-primary text-primary hover:bg-primary hover:text-background">
                            <MailPlus className="size-4" />
                            Invite
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}