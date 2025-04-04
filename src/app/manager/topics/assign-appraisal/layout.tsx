import { ManagerAssignAppraisalProvider } from "@/contexts/manager/manager-assign-appraisal-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ManagerAssignAppraisalProvider>
      {children}
    </ManagerAssignAppraisalProvider>
  );
}
