import { Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface AnalyticsData {
    pageId: string
}

/* 
    Path: /p/analytics?page=[pageId] 
    
    This page uses CSG. It is not statically generated at build time.
*/
export default function Analytics() {
    const router = useRouter()
    const { page } = router.query

    const [data, setData] = useState<AnalyticsData | undefined>(undefined)

    useEffect(() => {
        // TODO: Fetch analytics data for page
        // fetch(`some-api-route-here`)
        setData({
            pageId: page as string
        })
    }, [page])

    return (
        <>
            <Head>
                <title>{`Analytics for ${page} | ISAAC`}</title>
            </Head>
            <Container>
                <h1>Analytics</h1>
                <h2>{data?.pageId ?? "Loading..."}</h2>
            </Container>
        </>
    )
}