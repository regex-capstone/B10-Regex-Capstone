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

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
            created_at: "Wed"
        },
        {
            major: "Informatics",
            standing: "Freshman",
            created_at: "Fri"
        },
        {
            major: "Computer Science",
            standing: "Freshman",
            created_at: "Sun"
        },
        {
            major: "Informatics",
            standing: "Sophomore",
            created_at: "Sat"
        },
        {
            major: "Informatics",
            standing: "Junior",
            created_at: "Mon"
        }
    ];

    let standingData = [] as any[];
    let majorData = [] as any[];

    // need to convert standing and major data into numericals
    // there is probably a more elegant way to do this...
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
    };

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
                                data={testData}
                            >
                                <XAxis></XAxis>
                                <YAxis></YAxis>
                            </LineChart>
                            <PieChart width={300} height={300}>
                                <Pie data={standingData} nameKey="name" dataKey="value" outerRadius={100} fill="red"></Pie>
                            </PieChart>
                            <PieChart width={300} height={300}>
                                <Pie data={majorData} nameKey="name" dataKey="value" outerRadius={100} fill="green"></Pie>
                            </PieChart>
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