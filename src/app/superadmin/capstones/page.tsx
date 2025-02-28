import CapstoneTable from "@/app/superadmin/capstones/component/capstone-table";
import CapstoneOverallStats from "@/app/superadmin/capstones/component/capstone-overall-stats";
import { CapstoneProvider } from "@/contexts/superadmin/superadmin-capstone-context";

export default function CapstonePage() {
  return (
    <CapstoneProvider>
      <div className="flex flex-col gap-4">
        <CapstoneOverallStats />
        <CapstoneTable />
      </div>
    </CapstoneProvider>
  );
}