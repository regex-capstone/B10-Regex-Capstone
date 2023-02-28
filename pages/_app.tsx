import { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { SessionProvider, useSession } from 'next-auth/react';
import LoadingSpinner from '@/client/LoadingSpinner';
import { UserRole } from '@/isaac/models/User';
import { ComponentAuthOptions } from '@/isaac/auth/next-auth/AuthOptions';


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
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <LoadingSpinner />
    }

    const authProps = props.auth;
    const user = session?.user;

    // page is not protected
    if (!authProps) {
        return (
            <>{props.children}</>
        )
    }

    // ADMINs can see all pages
    if (user?.role !== authProps.role && user?.role !== UserRole.ADMIN) {
        return <h1>Not authorized</h1>
    }

    return (
        <>{props.children}</>
    )
}