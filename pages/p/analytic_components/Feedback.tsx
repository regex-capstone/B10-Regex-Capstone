import { Card, Title, DonutChart } from "@tremor/react";
import { XCircleIcon } from '@heroicons/react/solid'
import 'tailwindcss/tailwind.css'


const testData = [
    {
        name: "Yes",
        value: 410
    },
    {
        name: "No",
        value: 239
    }
]

interface FeedbackProps {
    analyticData: string
}

export default function Feedback(props: any) {

    return (
        <Card id={props.id}>
            <XCircleIcon
                className="absolute top-2 right-2 h-7 w-7"
                onClick={(e) => props.delete(props.id)}
            />
            <Title>Page Feedback</Title>
            <DonutChart
                className=""
                data={testData}
                colors={["blue", "red"]}
            />
        </Card>
    )
}