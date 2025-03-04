import { ManagerTopicProvider } from "@/contexts/manager/manager-topic-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ManagerTopicProvider>
      <div className="flex flex-col gap-2">{children}</div>
    </ManagerTopicProvider>
  );
}
