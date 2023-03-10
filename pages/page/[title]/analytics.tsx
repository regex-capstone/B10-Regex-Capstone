/* eslint-disable */
// reason: file is placeholder

import { Button, Container, Stack } from "@mui/material";
import { useEffect } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2'
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { Revision, Page as PageData } from "@/isaac/models";
import Head from "next/head";
import { Box } from "@mui/material";
import Link from "next/link";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts'

const chartDimensions = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 30, bottom: 30, left: 30 }
};

const currDate = new Date();

// TODO: get static paths/props from the page being edited
// getStaticPaths(something)
// getStaticProps(something)

interface DashboardProps {
  pageData: string,
  revisionData: string
}

/* (root)/ */
export default function Analytics(props: DashboardProps) {

    const testData = [
        {
            major: "Informatics",
            standing: "Freshman",
            created_at: "2023-03-09"
        },
        {
            major: "Informatics",
            standing: "Freshman",
            created_at: "2023-03-09"
        },
        {
            major: "Computer Science",
            standing: "Freshman",
            created_at: "2023-03-03"
        },
        {
            major: "Informatics",
            standing: "Sophomore",
            created_at: "2023-02-23"
        },
        {
            major: "Informatics",
            standing: "Junior",
            created_at: "2023-02-11"
        },
        {
            major: "Informatics",
            standing: "Junior",
            created_at: "2022-02-11"
        }
    ];

    let standingData = [] as any[];
    let majorData = [] as any[];
    let timeData = [] as any[];

    // need to process data into a format recharts likes
    // there is probably a more elegant way to do this...
    // TODO: move this to its own function
    for(let i = 0; i < testData.length; i++) {
        let curr = testData[i];

        // get location of element in array if it exists
        // j is standing, k is major
        const j = standingData.findIndex(e => e.name === curr.standing);
        const k = majorData.findIndex(e => e.name === curr.major);

        if(j > -1) { // if exists, add to value
            standingData[j].value += 1;
        } else {  // else we need to add a new element
            standingData.push({name: curr.standing, value: 1});
        }

        if(k > -1) { // if exists, add to value
            majorData[k].value += 1;
        } else {  // else we need to add a new element
            majorData.push({name: curr.major, value: 1});
        }

        // now process time data
        // this one is easy, just add an entry for the day
        let currDay = new Date(Date.parse(curr.created_at));
        let threshold = new Date(new Date().setDate(currDate.getDate() - 30));  // set date threshold, TODO: make this changable

        if(currDay >= threshold) {
            const l = timeData.findIndex(e => e.date === currDay.toDateString());

            if(l > -1) { // if exists, add to value
                timeData[l].value += 1;
            } else {  // else we need to add a new element
                timeData.push({date: currDay.toDateString(), value: 1});
            }
        }
    };
    console.log(timeData);

    // TODO: get real data from api: need static paths/props
    // const pageData: PageData = JSON.parse(props.pageData) as PageData;
    // const revisionData: Revision = JSON.parse(props.revisionData) as Revision;

    const query = "";
    return (
        <>
            <Head>
                <title>{`Example Analytics | ISAAC`}</title>
            </Head>
            <Container>
                <Grid2 container spacing={2}>
                    <Grid2 xs={1}>
                    </Grid2>
                    <Grid2 xs={10} sx={{
                        marginTop: 13
                    }}>
                        <Stack direction={'column'} spacing={2}>
                            <h1>Heading 1</h1>
                            <LineChart
                                width={500}
                                height={300}
                                data={timeData}
                            >
                                <XAxis dataKey="date"></XAxis>
                                <YAxis dataKey="value"></YAxis>
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                            <Stack direction={'row'} spacing={2}>
                                <PieChart width={300} height={300}>
                                    <Pie data={standingData} nameKey="name" dataKey="value" outerRadius={100} fill="red"></Pie>
                                </PieChart>
                                <PieChart width={300} height={300}>
                                    <Pie data={majorData} nameKey="name" dataKey="value" outerRadius={100} fill="green"></Pie>
                                </PieChart>
                            </Stack>
                            <Link href={`/edit`}>
                                <Button sx={{
                                    justifyContent: "left",
                                    width: 126,
                                    border: "1px solid black",
                                    color: "black"
                                }}>Back to Page</Button>
                            </Link>
                        </Stack>
                    </Grid2>
                    <Grid2 xs={1}>
                    </Grid2>
                </Grid2>
            </Container>
        </>
    )
}