import Overall from "@/app/admin/components/overall";

export default function ManagerOverall() {
    const items = [
        { title: "Total Manager(s)", value: 10 },
        { title: "Active Manager(s)", value: 10 },
    ];

    return (
        <Overall items={items} />
    );
}
