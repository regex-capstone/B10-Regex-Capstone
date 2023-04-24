import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/client/LoadingSpinner';

// TODO redo
export default function RedirectComponent() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    });

    return (
        <>
            <LoadingSpinner />
        </>
    )
}