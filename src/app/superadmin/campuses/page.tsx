import CampusTable from "@/app/superadmin/campuses/component/campus-table";
import CampusOverallStats from "@/app/superadmin/campuses/component/campus-overall-stats";


export default function CampusPage() {
  return (
    <div className="flex flex-col gap-4">
        <CampusOverallStats />
        <CampusTable />
    </div>
  );
}
