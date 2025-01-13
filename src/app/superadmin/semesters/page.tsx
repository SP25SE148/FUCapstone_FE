import SemesterOverallStats from "@/app/superadmin/semesters/components/semester-overall-stats";
import SemesterTable from "@/app/superadmin/semesters/components/semester-table";

export default function SemesterPage() {
  return (
    <div >
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
