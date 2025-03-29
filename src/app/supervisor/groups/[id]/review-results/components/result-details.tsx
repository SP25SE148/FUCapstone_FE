import { ReviewResult } from "@/types/types";

import DetailItem from "./detail-item";
import { CardContent } from "@/components/ui/card";

export default function ResultDetails({ results }: { results: ReviewResult[] }) {
    return (
        <CardContent className="space-y-4">
            {results?.reverse().map((result, index) => (
                <DetailItem key={index} result={result} />
            ))}
        </CardContent>
    )
}