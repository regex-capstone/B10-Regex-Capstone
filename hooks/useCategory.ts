import useSWR from 'swr';
import { escapeHTML } from '../client/utils/EscapeUtils';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export default function useCategory() {
    const { data, error, isLoading } = useSWR(`/api/category?sort_type=alphabetical`, fetcher);

    return {
        data: data,
        error: error,
        isLoading: isLoading
    }
}