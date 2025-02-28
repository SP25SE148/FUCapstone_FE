import CapstoneTable from "@/app/superadmin/capstones/component/capstone-table";
import CapstoneOverallStats from "@/app/superadmin/capstones/component/capstone-overall-stats";
<<<<<<< HEAD
import { CapstoneProvider } from "@/contexts/superadmin/superadmin-capstone-context";
=======
import { CapstoneProvider } from "@/contexts/superadmin/superadmin-capstone-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd

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