import { SuperadminCapstoneProvider } from "@/contexts/superadmin/superadmin-capstone-context";

import CapstoneTable from "@/app/superadmin/capstones/component/capstone-table";
import CapstoneOverallStats from "@/app/superadmin/capstones/component/capstone-overall-stats";

export default function CapstonePage() {
  return (
    <SuperadminCapstoneProvider>
      <div className="flex flex-col gap-4">
        <CapstoneOverallStats />
        <CapstoneTable />
      </div>
    </SuperadminCapstoneProvider>
  );
}