import { ManagerReviewProvider } from "@/contexts/manager/manager-review-context";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ManagerReviewProvider>
            <div className="flex flex-col gap-2">{children}</div>
        </ManagerReviewProvider>
    );
}