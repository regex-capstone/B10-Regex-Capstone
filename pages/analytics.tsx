import { Card, Title, Grid, Col, BarList, LineChart, Text } from "@tremor/react";
import { Select, MenuItem } from "@mui/material";
import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { MetricSearchQuery, MetricPageClick } from "@/isaac/models";
import { processMetric } from "../pages/p/analytics";
import LoadingSpinner from "@/client/LoadingSpinner";

// we need a different interface from the MetricInterface in page analytics
// to account for the name of search metrics not being the date, but
// rather the query
interface MetricInterfaceBar {
    name: string,
    value: number,
    created_at?: number
}

export default function OverallAnalytics() {
    const [searchData, setSearchData] = useState<MetricSearchQuery[]>();
    const [clickData, setClickData] = useState([] as MetricPageClick[]);

    const [rawSearchData, setRawSearchData] = useState([] as MetricInterfaceBar[]);
    const [rawClickData, setRawClickData] = useState([] as MetricInterfaceBar[]);

    const [searchTimeData, setSearchTimeData] = useState([] as MetricInterfaceBar[]);
    const [clickTimeData, setClickTimeData] = useState([] as MetricInterfaceBar[]);

    const [totalClicks, setTotalClicks] = useState<number>(0);
    const [totalSearches, setTotalSearches] = useState<number>(0);

    const [dateRange, setDateRange] = useState(7 as number);
    const [loading, setLoading] = useState(false as boolean);

    // fetch all data
    useEffect(() => {
        setLoading(true);

        fetch("/api/metric/search_query")
            .then(res => res.json())
            .then(data => setSearchData(data.payload))

        fetch("/api/metric/page_click")
            .then(res => res.json())
            .then(data => setClickData(data.payload))

        setLoading(false);
    }, []);

    // process search data for tremor
    useEffect(() => {
        if(searchData) {
            const metrics = searchData;
            const tempSearchData: MetricInterfaceBar[] = [];

            for (let i = 0; i < metrics.length; i++) {
                const focusMetric = metrics[i];

                // no need to process, it will be processed later
                tempSearchData.push({
                    name: focusMetric.search_query,
                    value: 1,
                    created_at: focusMetric.created_at
                });
            }
            setRawSearchData(tempSearchData);
        }
    }, [searchData])

    // process page click data for tremor
    useEffect(() => {
        if (clickData) {
            const metrics = clickData;
            const tempClickData: MetricInterfaceBar[] = [];

            for (let i = 0; i < metrics.length; i++) {
                const focusMetric = metrics[i];

                processMetric(tempClickData, focusMetric.created_at);
            }

            setRawClickData(tempClickData);
        }
    }, [clickData])

    // change search data based on date range
    useEffect(() => {
        const tempSearchData: MetricInterfaceBar[] = [];

        if (rawSearchData.length > 0) {
            for (let i = 0; i < rawSearchData.length; i++) {
                const queryName = rawSearchData[i].name
                const focusTime = new Date(rawSearchData[i].created_at as number);
                const threshold = new Date(new Date().setDate(new Date().getDate() - dateRange));

                if(focusTime >= threshold) {
                    processMetric(tempSearchData, queryName);
                }
            }
            // only run if array is not empty
            if(tempSearchData.length !== 0) {
                setTotalSearches(sumData(tempSearchData));
            }
            setSearchTimeData(tempSearchData);
        }
        setSearchTimeData(tempSearchData);
    }, [dateRange, rawSearchData]);

    // change click data based on date range
    useEffect(() => {
        const tempTimeData: MetricInterfaceBar[] = [];

        fillClickArray(tempTimeData, dateRange, new Date());

        if (rawClickData.length > 0) {
            for (let i = 0; i < rawClickData.length; i++) {
                const focusTime = new Date(rawClickData[i].name);
                const focusDateTime = focusTime.toISOString().slice(0, 10);

                processMetric(tempTimeData, focusDateTime);
            }
            // only run if array is not empty
            if(tempTimeData.length !== 0) {
                setTotalClicks(sumData(tempTimeData));
            }
        }
        setClickTimeData(tempTimeData);
    }, [dateRange, rawClickData])

    if(loading){
        return <LoadingSpinner />
    }

    return (
        <main>
            <h1>Overall analytics for ISAAC</h1>

            <Grid numColsLg={6} className="gap-6 mt-6">
                {/* Main section */}
                <Col numColSpanLg={4}>
                    <Card className="h-full">
                        <Title>Top 10 search queries last {dateRange} days</Title>
                        <BarList data={searchTimeData} className="mt-2" />
                    </Card>

                    <Card className="h-full">
                        <Title>Page views last {dateRange} days</Title>
                        <LineChart
                            data={clickTimeData}
                            index="name"
                            categories={["value"]}
                            colors={["green"]}
                            yAxisWidth={50}
                        />
                    </Card>
                </Col>

                {/* KPI sidebar */}
                <Col numColSpanLg={2}>
                    <div className="space-y-10">
                        <Card>
                            <h2>Select data date range</h2>
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
                                <MenuItem value={60}>60 days</MenuItem>
                                <MenuItem value={90}>90 days</MenuItem>
                            </Select>
                        </Card>
                        <Card>
                            <h2>Total page views last {dateRange} days</h2>
                            <Text>{totalClicks}</Text>
                        </Card>
                        <Card>
                            <h2>Total searches last {dateRange} days</h2>
                            <Text>{totalSearches}</Text>
                        </Card>
                    </div>
                </Col>
            </Grid>
        </main>
    );
}

const fillClickArray = (timeArr: MetricInterfaceBar[], dateRange: number, today: Date) => {
    for (let i = dateRange; i > 0; i--) {
        const newDate = new Date(today);
        newDate.setDate(newDate.getDate() - i);
        const dateName = newDate.toISOString().slice(0, 10);
        timeArr.push({ name: dateName, value: 0 });
    }
};

// summarizes values for totals
const sumData = (rawData: MetricInterfaceBar[]) => {
    return rawData.map(i => i.value).reduce((prev, next) => prev + next);
};

// processMetric from page analytics wont work for search since it needs created_by,
// so we make a new processing fucntion
const processSearchMetric = (tempArr: MetricInterfaceBar[], metricName: any, creationDate: number) => {
        
};