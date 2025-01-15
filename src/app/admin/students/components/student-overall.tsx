import Overall from "@/app/admin/components/overall";

export default function StudentOverall() {
    const items = [
        { title: "Total Student(s)", value: 1000 },
        { title: "Active Student(s)", value: 900 },
        { title: "Inactive Student(s)", value: 100 },
    ];

    return (
        <Overall items={items} />
    );
}
