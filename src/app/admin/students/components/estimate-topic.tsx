import { useState } from "react";
import { Calculator, Loader2 } from "lucide-react";

import { useAdminStudent } from "@/contexts/admin/admin-student-context";

import { Button } from "@/components/ui/button";

export default function EstimateTopic() {
    const { estimateTopics } = useAdminStudent();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClickEstimate = async () => {
        setIsLoading(true)
        try {
            await estimateTopics();
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant={"outline"}
            disabled={isLoading}
            onClick={handleClickEstimate}
            className="border-primary text-primary hover:bg-primary hover:text-white"
        >
            {isLoading ? <Loader2 className="animate-spin" /> : <Calculator />}
            {isLoading ? "Please wait ..." : "Estimate Topic"}
        </Button>
    )
}