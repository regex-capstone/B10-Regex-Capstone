import { Button, Container, Select, MenuItem } from "@mui/material";
import { Card, Grid } from "@tremor/react";
import { PlusCircleIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css'
import { useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
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
    const [testWidgets, setWidgets] = useState(["none", "eugh", "eugh", "none", "eugh", "none"] as string[]);
    const componentList = ["ViewsOverTime"];

    const AddButton = () => {
        // TODO: put add-widget card in here
    }

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
                            return (
                                <Card className="h-20" key="add-widget">
                                    <div className="relative">
                                        <PlusCircleIcon className="h-10 w-10 self-center absolute" onClick={addNewComponent} />
                                        <Select className="opacity-0 absolute">
                                            {componentList.map((i) => {
                                                return (
                                                    <MenuItem value={i} key={i}>{i}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                </Card>
                            );
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

// function to process metrics into easy to digest format
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

const addNewComponent = () => {

}

// ADMIN only
Analytics.auth = {
    role: UserRole.ADMIN
}