import { AppProps } from 'next/app'
import { CssBaseline} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { ComponentAuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
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
        }
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

function AuthLayout(props: { auth: ComponentAuthOptions } & { children: React.ReactNode }) {
    return (
        <>{props.children}</>
    )
}