import DashBoardCharts from "@/app/superadmin/(superadmin-dashboard)/components/dashboard-chart";
import DashBoardOverallStats from "@/app/superadmin/(superadmin-dashboard)/components/dashnoard-overall";



export default function Dashboard() {
  
  return (
    <div className="flex flex-col gap-4">
      <DashBoardOverallStats />
      <DashBoardCharts />
    </div>
  );
}
