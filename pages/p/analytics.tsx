import { Button, Container, Select, MenuItem } from "@mui/material";
import { Card, Grid } from "@tremor/react";
import { PlusCircleIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css'
import React, { useEffect, useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import sha256 from "crypto-js";


// import all components
import ViewsOverTime from './analytic_components/ViewsOverTime';

export interface MetricInterface {
    name: string | number;
    value: number;
}

// add new components to this enum to list them on the add component select
enum ComponentOptions {
    ViewsOverTime = "ViewsOverTime"
}

/* /p/analytics?page=[pageId] */
export default function Analytics() {
    const router = useRouter();
    const { page: title } = router.query;

    const [componentKeys, setComponentKeys] = useState<string[]>([]);   // TODO init user settings here <- DO NOT PRIORITIZE THIS YET, FINISH OUT THE BAREBONES THEN WE CAN TALK ABOUT STORING THIS INFORMATION
    const [addComponentOption, setAddComponentOption] = useState<string>('');
    const [deleteComponentOption, setDeleteComponentOption] = useState<string>('');

    useEffect(() => {
        if (addComponentOption !== '') {
            setComponentKeys(prev => [...prev, addComponentOption]);
            setAddComponentOption('');
        }
    }, [addComponentOption])    // Rerun after the user selects an option

    useEffect(() => {
        if (deleteComponentOption !== '') {
            const compToDelete = document.getElementById(deleteComponentOption);
            if(compToDelete) { // ensure compToDelete is not null
                compToDelete.remove();
            }
            setDeleteComponentOption('');
        }
    }, [deleteComponentOption])

    return (
        <>
            <Head>
                <title>{`${title} Analytics | ISAAC`}</title>
            </Head>
            <Container>
                <h1>{ `Page Analytics | ${title}` }</h1>
                <Grid numColsMd={3} className="mt-6 gap-6">
                    {
                        componentKeys.map((i, index) => {
                            // to add a new component, you need to pass in a case for the name as string,
                            // then return the component with whatever props it may need
                            switch (i) {
                                case "ViewsOverTime":
                                    const key = i + "-" + sha256.SHA256(i + index.toString());
                                    return (<ViewsOverTime key={key} id={key} delete={setDeleteComponentOption}/>);
                            }
                        })
                    }
                    <Card className="h-50">
                        <PlusCircleIcon className="h-10 w-10 self-center absolute" />
                        <Select
                            className="opacity-0 absolute"
                            onChange={(e) => setAddComponentOption(e.target.value as string)}
                            value={addComponentOption}
                        >
                            {
                                Object.keys(ComponentOptions).map((i, index) => {
                                    return (
                                        <MenuItem key={i + "-" + index} value={i}>{i}</MenuItem>
                                    )
                                })
                            }
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
