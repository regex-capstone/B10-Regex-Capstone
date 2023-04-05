import useSWR from 'swr';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export default function usePage(page_title: string) {
    const { data, error, isLoading } = useSWR(`/api/page/${page_title}`, fetcher);

    return {
        data: (data) ? data.page : data,
        error: error,
        isLoading: isLoading
    }
}