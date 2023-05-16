import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/client/LoadingSpinner';

/**
 * Redirects to the page specified within `path`
 */
export default function RedirectComponent() {
    const router = useRouter();
    const { path } = router.query;

    useEffect(() => {
        if (path === undefined) router.push('/');
        else router.push(`/${path}`);
    });

    return (
        <>
            <LoadingSpinner />
        </>
    )
}