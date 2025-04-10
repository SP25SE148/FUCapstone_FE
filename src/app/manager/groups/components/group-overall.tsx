"use client"

import { useManagerGroup } from "@/contexts/manager/manager-group-context";

import Overall from "@/app/manager/components/overall";

export default function GroupOverall() {
    const { groupList } = useManagerGroup();

    const items = [
        { title: "Total Group(s)", value: groupList?.length },
    ];

    return (
        <Overall items={items} />
    );
}
