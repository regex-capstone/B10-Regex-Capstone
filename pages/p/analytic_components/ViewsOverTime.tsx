import { Select, MenuItem } from "@mui/material";
import { MetricPageClick } from "@/isaac/models";
import { Card, LineChart, Title } from "@tremor/react";
import { XCircleIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css'
import { useEffect, useState } from 'react';
import LoadingSpinner from "@/client/LoadingSpinner";
import { processMetric, MetricInterface } from "../analytics";

export default function ViewsOverTime(props: any) {
    const [analyticData, setAnalyticData] = useState({} as MetricPageClick[]);
    const [loading, setLoading] = useState(false as boolean);
    const [dateRange, setDateRange] = useState(7 as number);
    const [timeData, setTimeData] = useState([] as MetricInterface[]);
    const [rawTimeData, setRawTimeData] = useState([] as MetricInterface[]);

    useEffect(() => {
        setLoading(true);

        fetch("/api/metric/page_click/" + props.page_id)
            .then(res => {
                const data = res.json();
                return data;
            })
            .then(results => setAnalyticData(results.payload));

        setLoading(false);
    }, [props.page_id])

    useEffect(() => {
        if (analyticData) {
            const metrics = analyticData;
            const tempTimeData: MetricInterface[] = [];

            for (let i = 0; i < metrics.length; i++) {
                const focusMetric = metrics[i];

                processMetric(tempTimeData, focusMetric.created_at);
            }

            setRawTimeData(tempTimeData);
        }
    }, [analyticData])

    useEffect(() => {
        const tempTimeData: MetricInterface[] = [];

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

    if(loading){ 
        return <LoadingSpinner />
    }

    return (
        <Card
            id={props.id}
        >
            <XCircleIcon
                className="absolute top-2 right-2 h-7 w-7"
                onClick={(e) => props.delete(props.id)}
            />
            <div style={{ 
                display: "flex",
                flexDirection: "row"
            }}>
                <Title style={{ flex: 1 }}>Page views last</Title>
                <Select
                    value={dateRange}
                    label="Date Range"
                    onChange={(e) => setDateRange(e.target.value as any)}
                    className="self-end px-5"
                    style={{ flex: 1 }}
                >
                    <MenuItem value={7}>7 days</MenuItem>
                    <MenuItem value={14}>14 days</MenuItem>
                    <MenuItem value={30}>30 days</MenuItem>
                </Select>
            </div>
            <LineChart
                data={timeData}
                index="name"
                categories={["value"]}
                colors={["green"]}
                yAxisWidth={50}
            />
        </Card>
    )
}

const fillTimeArray = (timeArr: MetricInterface[], dateRange: number, today: Date) => {
    for (let i = dateRange; i > 0; i--) {
        const newDate = new Date(today);
        newDate.setDate(newDate.getDate() - i);
        const dateName = newDate.toISOString().slice(0, 10);
        timeArr.push({ name: dateName, value: 0 });
    }
};