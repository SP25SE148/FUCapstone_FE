"use client"

import { useState } from "react";

export default function NotificationsPage() {
    const [preview, setPreview] = useState<Boolean>(false);

    const url = "https://fuc-topic.s3.ap-southeast-2.amazonaws.com/HCM/SPRING2025/SEP490/Pending/2fe3e53a-b8f3-44e3-b89c-bf8d1bf78a39?X-Amz-Expires=86400&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5CBGTSYU5BNXIUWY%2F20250222%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250222T152035Z&X-Amz-SignedHeaders=host&X-Amz-Signature=f0231d8036c6529348d365ff83d31845386eaabb93cdf8c2cafead0ffa499b72"

    return (
        <div>
            <button onClick={() => { setPreview(true) }} className="px-4 py-2 bg-blue-500 text-white rounded">
                Preview File
            </button>

            {preview && (
                <iframe src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`} className="w-full h-screen mt-4 border"></iframe>
            )}
        </div>
    );
}