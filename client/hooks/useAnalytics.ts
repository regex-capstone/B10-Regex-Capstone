import Metric from '@/isaac/analytics/model';
import useSWR from 'swr';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export default function useAnalytics(page_title: string) {
    const { data, error, isLoading } = useSWR(`/api/analytics/${page_title}`, fetcher);

    return {
        data: (data) ? data.metrics as Metric[] : [] as Metric[],
        error: error,
        isLoading: isLoading
    }
}