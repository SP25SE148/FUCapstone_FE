import { TopicAppraisal } from "@/types/types";

import AppraisalDetailsItem from "./appraisal-details-item";

export default function AppraisalDetails({ appraisals }: { appraisals: TopicAppraisal[] }) {
    return (
        <div className="space-y-4">
            {appraisals?.map((appraisal, index) => (
                <AppraisalDetailsItem key={index} appraisal={appraisal} />
            ))}
        </div>
    )
}