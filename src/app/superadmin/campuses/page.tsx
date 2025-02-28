import CampusTable from "@/app/superadmin/campuses/component/campus-table";
import CampusOverallStats from "@/app/superadmin/campuses/component/campus-overall-stats";
import { SuperadminCampusProvider } from "@/contexts/superadmin/superadmin-campus-context";

export default function CampusPage() {
  return (
    <SuperadminCampusProvider>
      <div className="flex flex-col gap-4">
        <CampusOverallStats />
        <CampusTable />
      </div>
    </SuperadminCampusProvider>
  );
}