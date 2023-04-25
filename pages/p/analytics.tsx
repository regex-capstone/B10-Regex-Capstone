import { Button, Container, Select, MenuItem } from "@mui/material";
import useDeepCompareEffect from 'use-deep-compare-effect'
import { Card, Grid } from "@tremor/react";
import { PlusCircleIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css'
import React, { useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserRole } from "@/isaac/models/User";

// import all components
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
    const [testComponents, setTestComponents] = useState(["ViewsOverTime"] as string[]);
    const [components, setComponents] = useState([] as JSX.Element[]);

    // add the component to this object
    const ComponentList: any = {
        "ViewsOverTime": ViewsOverTime({ title: title })
    };

    useDeepCompareEffect(() => {
        const newComponents = testComponents.map((i) => {
            console.log(i)
            return ComponentList[i];
        })
        console.log(newComponents);
        setComponents(newComponents);
    }, [testComponents]);
    // change when setTestComponents is fired
    // since equalities for dependencies is reference based, and testComponents is an array
    // it will always return false for reference equality (aka this effect runs forever)
    // thats why we import the deep compare effect hook, which checks equivalency based on values

    const addNewComponent = (event: any) => {
        const newComponent = event.target.value;
        setTestComponents(testComponents => [...testComponents, newComponent]);
    }

    return (
        <>
            <Head>
                <title>{`${title} Analytics | ISAAC`}</title>
            </Head>
            <Container>
                <h1>{ `Page Analytics | ${title}` }</h1>
                <Grid numColsMd={2} className="mt-6 gap-6">
                    {components}
                    <Card className="h-50">
                        <PlusCircleIcon className="h-10 w-10 self-center absolute" />
                        <Select className="opacity-0 absolute" onChange={addNewComponent}>
                            {Object.keys(ComponentList).map((i, index) => {
                                return (
                                    <MenuItem value={i} key={i + "-" + index}>{i}</MenuItem>
                                )
                            })}
                        </Select>
                    </Card>
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

// ADMIN only
Analytics.auth = {
    role: UserRole.ADMIN
}