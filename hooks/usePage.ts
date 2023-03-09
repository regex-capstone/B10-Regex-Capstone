import useSWR from 'swr';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export default function usePage(title: string) {
    const { data, error, isLoading } = useSWR(`/api/page/${title}`, fetcher);

    return {
        data: data,
        error: error,
        isLoading: isLoading
    }
}