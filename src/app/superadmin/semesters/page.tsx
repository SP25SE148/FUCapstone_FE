import { SuperadminSemesterProvider } from "@/contexts/superadmin/superadmin-semester-context";

import SemesterTable from "@/app/superadmin/semesters/components/semester-table";
import SemesterOverallStats from "@/app/superadmin/semesters/components/semester-overall-stats";

export default function SemesterPage() {
  return (
    <SuperadminSemesterProvider>
      <div className="flex flex-col gap-4">
        <SemesterOverallStats />
        <SemesterTable />
      </div>
    </SuperadminSemesterProvider>
  );
}