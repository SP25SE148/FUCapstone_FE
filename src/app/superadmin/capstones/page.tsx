import CapstoneOverallStats from "@/app/superadmin/capstones/component/capstone-overall-stats";
import CapstoneTable from "@/app/superadmin/capstones/component/capstone-table";

export default function CapstonePage() {
  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overall</h2>
        <CapstoneOverallStats />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Capstones</h2>
        <CapstoneTable />
      </div>
    </div>
  );
}
