import Overall from "@/app/manager/components/overall";

export default function TopicOverall() {
    const items = [
        { title: "Total Topic(s)", value: 120 },
        { title: "Available Topic(s)", value: 20 },
    ];

    return (
        <Overall items={items} />
    );
}
