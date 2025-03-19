import { ManagerTopicProvider } from "@/contexts/manager/manager-topic-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ManagerTopicProvider>
      {children}
    </ManagerTopicProvider>
  );
}
