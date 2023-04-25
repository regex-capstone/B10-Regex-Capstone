import useSWR from 'swr';
import { escapeHTML } from '../client/utils/EscapeUtils';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export default function useAnalytic(title: string) {
    const { data, error, isLoading } = useSWR(`/api/analytic/${title}`, fetcher);

    return {
        data: data,
        error: error,
        isLoading: isLoading
    }
}