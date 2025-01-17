import SemesterOverallStats from "@/app/superadmin/semesters/components/semester-overall-stats";
import SemesterTable from "@/app/superadmin/semesters/components/semester-table";

export default function SemesterPage() {
  return (
    <div className="flex flex-col gap-4">
      <SemesterOverallStats />
      <SemesterTable />
    </div>
  );
}
