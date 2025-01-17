import Overall from "@/app/manager/components/overall";

export default function GroupOverall() {
    const items = [
        { title: "Total Group(s)", value: 100 },
        { title: "Passed Group(s)", value: 50 },
        { title: "In Progress Group(s)", value: 50 },
    ];

    return (
        <Overall items={items} />
    );
}
