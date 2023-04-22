import { Button, Container, Stack, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2'
import Head from "next/head";
import Link from "next/link";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, PieChart, Pie, Tooltip } from 'recharts'
import { useRouter } from "next/router";
import LoadingSpinner from "@/client/LoadingSpinner";
import { UserRole } from "@/isaac/models/User";

interface Metric {
    name: string | number;
    value: number;
}

/* /p/analytics?page=[pageId] */
export default function Analytics() {
    const router = useRouter();
    const { page: title } = router.query;

    const [dateRange, setDateRange] = useState(30 as number);
    const [standingData, setStandingData] = useState([] as Metric[]);
    const [majorData, setMajorData] = useState([] as Metric[]);
    const [timeData, setTimeData] = useState([] as Metric[]);
    const [rawTimeData, setRawTimeData] = useState([] as Metric[]);

    useEffect(() => {
        // const metrics = [];
        // const tempStandingData: Metric[] = [];
        // const tempMajorData: Metric[] = [];
        // const tempTimeData: Metric[] = [];

        // for (let i = 0; i < metrics.length; i++) {
        //     const focusMetric = metrics[i];

        //     processMetric(tempStandingData, focusMetric.standing);
        //     processMetric(tempMajorData, focusMetric.major);
        //     processMetric(tempTimeData, focusMetric.created_at);
        // }

        // setStandingData(tempStandingData);
        // setMajorData(tempMajorData);
        // setRawTimeData(tempTimeData);
    }, [])

    useEffect(() => {
        const tempTimeData: Metric[] = [];

        fillTimeArray(tempTimeData, dateRange, new Date());

        if (rawTimeData.length > 0) {
            for (let i = 0; i < rawTimeData.length; i++) {
                const focusTime = new Date(rawTimeData[i].name);
                const focusDateTime = focusTime.toISOString().slice(0, 10);

                processMetric(tempTimeData, focusDateTime);
            }
        }

        setTimeData(tempTimeData);
    }, [dateRange, rawTimeData])

    return (
        <>
            <Head>
                <title>{`${title} Analytics | ISAAC`}</title>
            </Head>
            <Container>
                <Grid2 container spacing={2}>
                    <Grid2 xs={1}>
                    </Grid2>
                    <Grid2 xs={10} sx={{
                        marginTop: 13
                    }}>
                        <h1>{`Page Analytics | ${title}`}</h1>
                        <Stack direction={'column'} spacing={2}>
                            <div id="time-chart">
                                <h2>Total views: {rawTimeData.length}</h2>
                                <h2>Page views last {dateRange} days</h2>
                                <Select
                                    value={dateRange}
                                    label="Date Range"
                                    onChange={(e) => setDateRange(e.target.value as any)}
                                >
                                    <MenuItem value={30}>30</MenuItem>
                                    <MenuItem value={60}>60</MenuItem>
                                    <MenuItem value={120}>120</MenuItem>
                                </Select>
                                <ResponsiveContainer width={1000} height={300}>
                                    <LineChart
                                        width={1000}
                                        height={300}
                                        data={timeData}
                                        margin={{ right: 100, top: 30, bottom: 100 }}
                                    >
                                        <XAxis dataKey="name" angle={45} textAnchor="start"></XAxis>
                                        <YAxis></YAxis>
                                        <Tooltip />
                                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <Stack direction={'row'} spacing={2}>
                                <div id="class-standing-chart">
                                    <Stack direction={'column'}>
                                        <h2>Breakdown by Class Standing</h2>
                                        <ResponsiveContainer width={300} height={300}>
                                            <PieChart width={300} height={300}>
                                                <Pie data={standingData} nameKey="name" dataKey="value" outerRadius={100} fill="red"></Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Stack>
                                </div>
                                <div id="major-chart" style={{ paddingLeft: 200 }}>
                                    <Stack direction={'column'}>
                                        <h2>Breakdown by Major</h2>
                                        <ResponsiveContainer width={300} height={300}>
                                            <PieChart width={300} height={300}>
                                                <Pie data={majorData} nameKey="name" dataKey="value" outerRadius={100} fill="green"></Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Stack>
                                </div>
                            </Stack>
                            <Link href={`/p/${title}`}> {/* Fix the title shit after title refactor */}
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

const processMetric = (tempArr: Metric[], metricName: any) => {
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

const fillTimeArray = (timeArr: Metric[], dateRange: number, today: Date) => {
    for (let i = dateRange; i > 0; i--) {
        const newDate = new Date(today);
        newDate.setDate(newDate.getDate() - i);
        const dateName = newDate.toISOString().slice(0, 10);
        timeArr.push({ name: dateName, value: 0 });
    }
};