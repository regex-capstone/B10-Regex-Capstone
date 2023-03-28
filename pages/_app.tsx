import { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { SessionProvider, useSession } from 'next-auth/react';
import { UserRole } from '@/isaac/models/User';
import { ComponentAuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import NotAuthorizedPage from '@/client/NotAuthorizedPage';

// application theme, left intentionally empty (default)
const theme = createTheme({})

/* (application root) */
export default function App({
    Component,
    pageProps: { session, ...pageProps }
}: AppProps<any>) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SessionProvider session={session}>
                <AuthLayout auth={Component.auth}>
                    <Component {...pageProps} />
                </AuthLayout>
            </SessionProvider>
        </ThemeProvider>
    )
}

function AuthLayout(
    props: { auth: ComponentAuthOptions } & { children: React.ReactNode }
) {
    const { data: session } = useSession();

    const authProps = props.auth;
    const user = session?.user;

    // admin access only
    if (authProps && authProps.role === UserRole.ADMIN && user?.role !== UserRole.ADMIN) {
        return <NotAuthorizedPage requireAdmin={true} />
    }

    return (
        <>{props.children}</>
    )
}