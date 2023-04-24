import useSWR from 'swr';
import { escapeHTML } from '../client/utils/EscapeUtils';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

const options = {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  }

export default function useSearch(query: string) {
    const cleanedInput = escapeHTML(query);

    const { data, error, isLoading } = useSWR(`/api/search/${cleanedInput}`, fetcher, options);

    return {
        data: data,
        error: error,
        isLoading: isLoading
    }
}