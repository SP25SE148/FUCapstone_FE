import OverallStats from "@/app/superadmin/campus/component/overall-stats";
import CampusTable from "@/app/superadmin/campus/component/campus-table";

export default function CampusPage() {
  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h2 className="text-2xl text-black font-semibold mb-4">Overall</h2>
        <OverallStats />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl text-black font-semibold mb-4">Campuses</h2>
        <CampusTable />
      </div>
    </div>
  );
}
