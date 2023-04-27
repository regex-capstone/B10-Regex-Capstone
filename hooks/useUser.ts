import useSWR from 'swr';
import { escapeHTML } from '../client/utils/EscapeUtils';
import { User } from '@/isaac/models';

// @ts-ignore
// TODO redo
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export default function useUser(email: string) {
    const { data, error, isLoading } = useSWR(`/api/user`, fetcher);

    return {
        data: (data) ? data.user as User : undefined,
        error: error,
        isLoading: isLoading
    }
}

export async function saveUser(user: User) {
    const userOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }

    const postRequest = await fetch('/api/user', userOptions);
    return await postRequest.json();
}