import { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

// application theme, left intentionally empty (default)
const theme = createTheme({})

/* (application root) */
export default function App({ Component, pageProps }: AppProps<any>) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    )
}