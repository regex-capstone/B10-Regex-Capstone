import { Card, Title, Text, Grid, Col, BarList } from "@tremor/react";
import { HmacSHA3 } from "crypto-js";
import 'tailwindcss/tailwind.css';

interface AnalyticsProps {

}

const DummySearchData = [
    {
        name: "test page 1",
        value: 140
    },
    {
        name: "test page 2",
        value: 97
    },
    {
        name: "test page 3",
        value: 59
    },
    {
        name: "test page 4",
        value: 24
    },
    {
        name: "test page 5",
        value: 8
    },
    {
        name: "test page 6",
        value: 72
    },
    {
        name: "test page 7",
        value: 185
    },
    {
        name: "test page 8",
        value: 49
    },
    {
        name: "test page 9",
        value: 17
    },
    {
        name: "test page 10",
        value: 2
    }
]

export default function OverallAnalytics(props: AnalyticsProps) {

    const totalViews = DummySearchData.map(i => i.value).reduce((prev, next) => prev + next); // just takes the sum of value in array of objects

    return (
        <main>
            <h1>Overall analytics for ISAAC</h1>
        
            <Grid numColsLg={6} className="gap-6 mt-6">
                {/* Main section */}
                <Col numColSpanLg={4}>
                    <Card className="h-full">
                        <BarList data={DummySearchData} className="mt-2" />
                    </Card>
                </Col>
        
                {/* KPI sidebar */}
                <Col numColSpanLg={2}>
                    <div className="space-y-6">
                        <Card>
                            <h2>Total Page views</h2>
                            <h3>{totalViews}</h3>
                        </Card>
                        <Card>
                            <div className="h-24" />
                        </Card>
                        <Card>
                            <div className="h-24" />
                        </Card>
                    </div>
                </Col>
            </Grid>
        </main>
      );
}