import DashBoardCharts from "@/app/superadmin/(superadmin-dashboard)/components/dashboard-chart";
import DashBoardOverallStats from "@/app/superadmin/(superadmin-dashboard)/components/dashnoard-overall";



export default function Dashboard() {
  
  return (
    <div className="flex min-h-screen flex-col gap-4 p-8">
      <DashBoardOverallStats />
      <DashBoardCharts />
    </div>
  );
}
