import SemesterOverallStats from "@/app/superadmin/semesters/components/semester-overall-stats";
import SemesterTable from "@/app/superadmin/semesters/components/semester-table";
import { SuperadminSemesterProvider } from "@/contexts/superadmin/superadmin-semester-context";

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