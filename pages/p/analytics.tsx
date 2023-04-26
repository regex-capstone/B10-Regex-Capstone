// TODO: keith handle

import { Button, Container, Stack, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2'
import Head from "next/head";
import Link from "next/link";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, PieChart, Pie, Tooltip } from 'recharts'
import { useRouter } from "next/router";
import LoadingSpinner from "@/client/LoadingSpinner";

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


const fillTimeArray = (timeArr: Metric[], dateRange: number, today: Date) => {
    for (let i = dateRange; i > 0; i--) {
        const newDate = new Date(today);
        newDate.setDate(newDate.getDate() - i);
        const dateName = newDate.toISOString().slice(0, 10);
        timeArr.push({ name: dateName, value: 0 });
    }
};