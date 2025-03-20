import { ManagerDefenseProvider } from "@/contexts/manager/manager-defense-context";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ManagerDefenseProvider>
            <div className="flex flex-col gap-2">{children}</div>
        </ManagerDefenseProvider>
    );
}