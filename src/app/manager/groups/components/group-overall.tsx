"use client"

import Overall from "@/app/manager/components/overall";
import { useManagerGroup } from "@/contexts/manager/manager-group-context";

export default function GroupOverall() {
    const { groupList } = useManagerGroup();

    const items = [
        { title: "Total Group(s)", value: groupList?.length },
    ];

    return (
        <Overall items={items} />
    );
}
