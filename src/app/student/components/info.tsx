import { User } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/auth-context";

import { Button } from "@/components/ui/button";

export default function Info() {
    const { user } = useAuth();
    const router = useRouter();
    return (
        <Button
            className="fixed top-2 right-12 z-[45] bg-background border-primary"
            variant="outline"
            onClick={() => {
                router.push("/student/home")
            }}
        >
            <User />
            {user?.name}
        </Button>
    )

}