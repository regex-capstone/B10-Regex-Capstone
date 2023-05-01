import { Button, Container, Select, MenuItem, Box } from "@mui/material";
import { Card, Grid } from "@tremor/react";
import { PlusCircleIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css'
import React, { useEffect, useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import sha256 from "crypto-js";
import { Page } from "@/isaac/models";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import Header from "@/client/Header";

// TODO move these analytics components to like `/client/analytics` or something
// import all components
import ViewsOverTime from './analytic_components/ViewsOverTime';
import Feedback from './analytic_components/Feedback';
import NegativeFeedbackMessages from './analytic_components/NegativeFeedbackMessages';
export interface MetricInterface {
    name: string | number;
    value: number;
}

// add new components to this enum to list them on the add component select
enum ComponentOptions {
    ViewsOverTime = "ViewsOverTime",
    Feedback = "Feedback",
    NegativeFeedbackMessages = "NegativeFeedbackMessages"
}

/* /p/analytics?page=[pageId] */
export default function Analytics() {
    const router = useRouter();
    const { slug } = router.query;

    const [pageData, setPageData] = useState<Page>();

    useEffect(() => {
        if (slug) {
            fetch('/api/page/slug/' + slug)
                .then(res => res.json())
                .then(data => setPageData(data.payload));
        }
    }, [slug])

    return (
        <>
            {
                pageData ? <AnalyticsContainer pageData={pageData} /> : <></>
            }
        </>
    )
}

function AnalyticsContainer(props: any) {
    const { pageData } = props;
    const [componentKeys, setComponentKeys] = useState<string[]>([]);
    const [addComponentOption, setAddComponentOption] = useState<string>('');
    const [deleteComponentOption, setDeleteComponentOption] = useState<string>('');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (addComponentOption !== '') {
            setComponentKeys(prev => [...prev, addComponentOption]);
            setAddComponentOption('');
        }
    }, [addComponentOption])    // Rerun after the user selects an option

    useEffect(() => {
        if (deleteComponentOption !== '') {
            const compToDelete = document.getElementById(deleteComponentOption);
            if (compToDelete) { // ensure compToDelete is not null
                compToDelete.remove();
            }
            setDeleteComponentOption('');
        }
    }, [deleteComponentOption])

    return (
        <>
            <Head>
                <title>{`"${pageData.title}" Analytics | ISAAC`}</title>
            </Head>
            <Header />
            <Container>
                <Box
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="5%"
                >
                    <h1>{`"${pageData.title}" Analytics Dashboard`}</h1>
                    <Grid numColsMd={3} className="mt-6 gap-6">
                        {
                            componentKeys.map((i, index) => {
                                // to add a new component, you need to pass in a case for the name as string,
                                // then return the component with whatever props it may need
                                switch (i) {
                                    case "ViewsOverTime":
                                        const viewsKey = i + "-" + sha256.SHA256(i + index.toString());
                                        return (<ViewsOverTime key={viewsKey} id={pageData.id} delete={setDeleteComponentOption} />);
                                    case "Feedback":
                                        const feedbackKey = i + "-" + sha256.SHA256(i + index.toString());
                                        return (<Feedback key={feedbackKey} id={pageData.id} delete={setDeleteComponentOption} />);
                                    case "NegativeFeedbackMessages":
                                        const feedbackMessageKey = i + "-" + sha256.SHA256(i + index.toString());
                                        return (<NegativeFeedbackMessages key={feedbackMessageKey} id={pageData.id} delete={setDeleteComponentOption} />);
                                }
                            })
                        }
                        <Card>
                            <Grid>
                                <PlusCircleIcon
                                    className="opacity-100 hover:opacity-50 m-auto cursor-pointer h-10 w-10 self-center"
                                    onClick={() => setMenuOpen(prev => !prev)}
                                />
                                <Select
                                    className="opacity-0 absolute"
                                    onChange={(e) => setAddComponentOption(e.target.value as string)}
                                    value={addComponentOption}
                                    onClick={() => setMenuOpen(prev => !prev)}
                                    open={menuOpen}
                                >
                                    {
                                        Object.keys(ComponentOptions).map((i, index) => {
                                            return (
                                                <MenuItem key={i + "-" + index} value={i}>{i}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </Grid>
                        </Card>
                    </Grid>
                    <Link href={`/p/${pageData.slug}`}>
                        <Button sx={{
                            justifyContent: "left",
                            width: 126,
                            border: "1px solid black",
                            color: "black",
                            mt: "20px"
                        }}>Back to Page</Button>
                    </Link>
                </Box>
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
