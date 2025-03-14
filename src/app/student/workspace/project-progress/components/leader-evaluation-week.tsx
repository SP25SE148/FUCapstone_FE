"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import LeaderEvaluationSheet from "./leader-evaluation-sheet";

export default function LeaderEvaluationWeek({ data }: { data: any }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Evaluation
      </Button>
      <LeaderEvaluationSheet open={open} onClose={() => setOpen(false)} data={data} />
    </>
  );
}