import Overall from "@/app/admin/components/overall";

export default function SupervisorOverall() {
    const items = [
        { title: "Total Supervisor(s)", value: 100 },
        { title: "Active Supervisor(s)", value: 100 },
        { title: "Inactive Supervisor(s)", value: 0 },
    ];

    return (
        <Overall items={items} />
    );
}
