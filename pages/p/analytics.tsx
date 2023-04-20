import { Button, Container, Stack, Select, MenuItem } from "@mui/material";
import { Card, LineChart, Title, Grid, Metric } from "@tremor/react";
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css'
import { useEffect, useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2'
import Head from "next/head";
import Link from "next/link";
import useAnalytics from "@/client/hooks/useAnalytics";
import { useRouter } from "next/router";
import LoadingSpinner from "@/client/LoadingSpinner";
import { UserRole } from "@/isaac/models/User";

import ViewsOverTime from "./analytic_components/ViewsOverTime";

export interface MetricInterface {
    name: string | number;
    value: number;
}

/* /p/analytics?page=[pageId] */
export default function Analytics() {
    const router = useRouter();
    const { page: title } = router.query;

    // TODO: get set widgets from user settings
    const [testWidgets, setWidgets] = useState(["none", "eugh", "none", "none", "none", "none"] as string[]);

    return (
        <>
            <Head>
                <title>{`${title} Analytics | ISAAC`}</title>
            </Head>
            <Container>
                <h1>{ `Page Analytics | ${title}` }</h1>

                <Grid numColsMd={2} className="mt-6 gap-6">
                    {testWidgets.map((i) => {
                        if(i === "none") {
                            return <Card key="add-widget"><PlusCircleIcon className="h-10 w-10 self-center" /></Card>
                        } else {
                            return ViewsOverTime(title as string);
                        }
                    })}
                </Grid>
                <Link href={`/p/${title}`}> {/* Fix the title shit after title refactor */}
                    <Button sx={{
                        justifyContent: "left",
                        width: 126,
                        border: "1px solid black",
                        color: "black"
                    }}>Back to Page</Button>
                </Link>
            </Container>
        </>
    )
}

export function processMetric(tempArr: MetricInterface[], metricName: any) {
    const indexCheck = tempArr.findIndex(e => e.name === metricName);

    if (indexCheck > -1) {
        tempArr[indexCheck].value += 1;
    } else {
        tempArr.push({
            name: metricName,
            value: 1
        });
    }
}

// ADMIN only
Analytics.auth = {
    role: UserRole.ADMIN
}