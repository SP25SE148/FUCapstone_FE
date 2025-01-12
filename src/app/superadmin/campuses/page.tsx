import CampusTable from "@/app/superadmin/campuses/component/campus-table";
import CampusOverallStats from "@/app/superadmin/campuses/component/campus-overall-stats";


export default function CampusPage() {
  return (
    <div className="flex-1 p-8 w-full ">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overall</h2>
        <CampusOverallStats />
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Campuses</h2>
        <CampusTable />
      </div>
    </div>
  );
}
