import DetailItem from "@/app/supervisor/defenses/[id]/components/detail-item"
import type { ReviewResult } from "@/types/types"

export default function ResultDetails({ results }: { results: ReviewResult[] }) {
  return (
    <div className="space-y-4">
      {results
        ?.sort((a, b) => b.attempt - a.attempt)
        ?.map((result, index) => (
          <DetailItem key={index} result={result} />
        ))}
    </div>
  )
}
