import CampusTable from "@/app/superadmin/campuses/component/campus-table";
import CampusOverallStats from "@/app/superadmin/campuses/component/campus-overall-stats";
<<<<<<< HEAD
import { SuperadminCampusProvider } from "@/contexts/superadmin/superadmin-campus-context";
=======
import { CampusProvider } from "@/contexts/superadmin/superadmin-campus-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd

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