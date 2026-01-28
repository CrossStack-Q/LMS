"use client";

import React from 'react'
import { useRouter } from "next/navigation";

type Props = {}

const Page = (props: Props) => {
    const router = useRouter()

    const skipFunc = () => {
        router.push("/dashboard/home")

    };
    return (
        <div>
            <input type="text" name="name" id="name" />
            <button>Process</button>
            <button onClick={skipFunc}>Skip</button>
        </div>
    )
}

export default Page