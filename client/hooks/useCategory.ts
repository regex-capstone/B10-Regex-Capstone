import useSWR from 'swr';
import { escapeHTML } from '../utils/EscapeUtils';
import { Category } from '@/isaac/models';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export default function useCategory() {
    const { data, error, isLoading } = useSWR(`/api/category`, fetcher);

    return {
        data: (data) ? data.categories as Category[] : undefined,
        error: error,
        isLoading: isLoading
    }
}