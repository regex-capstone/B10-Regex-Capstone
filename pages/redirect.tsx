import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { UserMajor, UserStanding } from '@/isaac/models/User';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/client/LoadingSpinner';
import { useUser } from '@/client/hooks/useUser';

export default function RedirectComponent() {
    const { data: session } = useSession();
    const { data: userData } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            const isDocumented = (
                userData.standing !== UserStanding.UNKNOWN
                && userData.major !== UserMajor.UNKNOWN
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