import useSWR from 'swr';
import { escapeHTML } from '../utils/EscapeUtils';
import { User } from '@/isaac/models';

// @ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export function useUser() {
    const { data, error, isLoading } = useSWR(`/api/user`, fetcher);

    return {
        data: (data) ? data.user as User : {} as User,
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