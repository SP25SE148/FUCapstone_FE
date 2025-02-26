import CampusTable from "@/app/superadmin/campuses/component/campus-table";
import CampusOverallStats from "@/app/superadmin/campuses/component/campus-overall-stats";
import { CampusProvider } from "@/contexts/superadmin/superadmin-campus-management";

export default function CampusPage() {
  return (
    <CampusProvider>
      <div className="flex flex-col gap-4">
        <CampusOverallStats />
        <CampusTable />
      </div>
    </CampusProvider>
  );
}