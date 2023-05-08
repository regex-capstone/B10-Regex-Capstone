import { Card, Title, Text } from "@tremor/react";
import { MetricPageFeedback } from "@/isaac/models";
import { XCircleIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css'
import { useEffect, useState } from 'react';
import LoadingSpinner from "@/client/LoadingSpinner";
import { Pagination } from "@mui/material";

interface FeedbackInterface {
    text: string;
}

export default function NegativeFeedbackMessages(props: any) {
    const [feedbackData, setFeedbackData] = useState({} as MetricPageFeedback[]);
    const [processedData, setProcessedData] = useState([] as FeedbackInterface[]);
    const [page, setPage] = useState(1 as number);
    const [loading, setLoading] = useState(false as boolean);

    useEffect(() => {
        setLoading(true);

        fetch("/api/metric/page_feedback/" + props.page_id)
            .then(res => res.json())
            .then(results => setFeedbackData(results.payload));

        setLoading(false);
    }, [props.page_id])

    useEffect(() => {
        if(feedbackData) {
            const metrics = feedbackData;
            const tempFeedbackData: FeedbackInterface[] = [];

            for (let i = 0; i < metrics.length; i++) {
                const focusMetric = metrics[i];
                const textContent = focusMetric.user_feedback;

                if(textContent !== "<N/A>") {
                    tempFeedbackData.push({ "text": textContent } as FeedbackInterface)
                }
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
            <Title>Negative Feedback Messages</Title>
            <Text>{processedData[page-1]?.text ?? "Loading..."}</Text>
            <Pagination
                count={processedData.length}
                page={page}
                onChange={(e, val) => setPage(val)}
            />
        </Card>
    )
}