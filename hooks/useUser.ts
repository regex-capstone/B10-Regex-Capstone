import useSWR from 'swr';
import { escapeHTML } from '../client/utils/EscapeUtils';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export default function useUser(email: string) {
    const cleanedEmail = escapeHTML(email);

    const { data, error, isLoading } = useSWR(`/api/user`, fetcher);

    return {
        data: data,
        error: error,
        isLoading: isLoading
    }
}