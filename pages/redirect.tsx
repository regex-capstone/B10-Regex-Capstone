import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserMajor, UserStanding } from '@/isaac/models/User';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/client/LoadingSpinner';

export default function RedirectComponent() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            const user = session.user;
            const isDocumented = (
                user.standing !== UserStanding.UNKNOWN
                && user.major !== UserMajor.UNKNOWN
            ) ? true : false;


            router.push((isDocumented) ? '/' : '/profile');
            return;
        }
        
        router.push('/');
    });

    return (
        <>
            <LoadingSpinner />
        </>
    )
}