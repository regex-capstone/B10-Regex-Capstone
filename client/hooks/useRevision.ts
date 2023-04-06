import { Revision } from '@/isaac/models';
import useSWR from 'swr';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export default function useRevision(page_title: string) {
    const { data, error, isLoading } = useSWR(`/api/revision/${page_title}`, fetcher);

    return {
        data: (data) ? data.revision as Revision: {},
        error: error,
        isLoading: isLoading
    }
}