import CapstoneOverallStats from "@/app/superadmin/capstones/component/capstone-overall-stats";
import CapstoneTable from "@/app/superadmin/capstones/component/capstone-table";

export default function CapstonePage() {
  return (
    <div className="flex flex-col gap-4">
      <CapstoneOverallStats />
      <CapstoneTable />
    </div>
  );
}
