import { ManagerGroupProvider } from "@/contexts/manager/manager-group-context";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ManagerGroupProvider>
            {children}
        </ManagerGroupProvider>
    );
}