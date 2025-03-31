import { ReviewResult } from "@/types/types";

import DetailItem from "./detail-item";

export default function ResultDetails({ results }: { results: ReviewResult[] }) {
    return (
        <div className="space-y-4">
            {results?.reverse().map((result, index) => (
                <DetailItem key={index} result={result} />
            ))}
        </div>
    )
}