import SemesterOverallStats from "@/app/superadmin/semester/components/overall-stats";
import SemesterTable from "@/app/superadmin/semester/components/semester-table";

export default function SemesterPage() {
  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overall</h2>
        <SemesterOverallStats />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Semesters</h2>
        <SemesterTable />
      </div>
    </div>
  );
}
