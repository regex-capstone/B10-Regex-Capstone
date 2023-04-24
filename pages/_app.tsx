import { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { SessionProvider, useSession } from 'next-auth/react';
import { ComponentAuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import NotAuthorizedPage from '@/client/NotAuthorizedPage';
import Theme from '@/client/Theme';
import './_app.css'

const theme = createTheme({
    palette: {
        primary: {
            main: Theme.COLOR.PRIMARY,
        },
        secondary: {
            main: Theme.COLOR.BACKGROUND_LIGHT,
        },
    },
    typography: {
        fontFamily: "Open Sans, sans-serif",
        h1: {
            fontFamily: "Encode Sans, sans-serif",
        },
        h2: {
            fontFamily: "Encode Sans, sans-serif",
        },
        h3: {
            fontFamily: "Encode Sans, sans-serif",
        },
        h4: {
            fontFamily: "Encode Sans, sans-serif",
        },
        h5: {
            fontFamily: "Encode Sans, sans-serif",
        },
        h6: {
            fontFamily: "Encode Sans, sans-serif",
        },
    }
})

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

    // TODO: Elbert - rehandle auth
    // const authProps = props.auth;

    // // admin access only
    // if (authProps && authProps.role === UserRole.ADMIN && !session?.isAdmin) {
    //     return <NotAuthorizedPage requireAdmin={true} />
    // }

    return (
        <>{props.children}</>
    )
}