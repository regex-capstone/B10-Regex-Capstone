import { Card, Title, DonutChart, Text } from "@tremor/react";
import { MetricPageFeedback } from "@/isaac/models";
import { XCircleIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css'
import { useEffect, useState } from 'react';
import { processMetric, MetricInterface } from "../analytics";
import LoadingSpinner from "@/client/LoadingSpinner";

export default function Feedback(props: any) {
    const [feedbackData, setFeedbackData] = useState({} as MetricPageFeedback[]);
    const [processedData, setProcessedData] = useState([] as MetricInterface[]);
    const [loading, setLoading] = useState(false as boolean);

    useEffect(() => {
        setLoading(true);

        fetch("/api/metric/page_feedback/" + props.id)
            .then(res => res.json())
            .then(results => setFeedbackData(results.payload));

        setLoading(false);
    }, [props.id])

    useEffect(() => {
        if(feedbackData) {
            const metrics = feedbackData;
            const tempFeedbackData: MetricInterface[] = [];

            for (let i = 0; i < metrics.length; i++) {
                const focusMetric = metrics[i];

                processMetric(tempFeedbackData, focusMetric.is_helpful.toString()); // since is_helpful is boolean, need to stringify
            }

            setProcessedData(tempFeedbackData);
        }
    }, [feedbackData]);

    if(loading) {
        return <LoadingSpinner />
    }

    return (
        <Card id={props.id}>
            <XCircleIcon
                className="absolute top-2 right-2 h-7 w-7"
                onClick={(e) => props.delete(props.id)}
            />
            <Title>Page Feedback</Title>
            <Text>Did people find this page helpful?</Text>
            <DonutChart
                className=""
                data={processedData}
                category="value"
                index="name"
                colors={["red", "blue"]}
            />
        </Card>
    )
}