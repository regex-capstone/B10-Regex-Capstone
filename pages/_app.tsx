import { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { SessionProvider } from 'next-auth/react'

// application theme, left intentionally empty (default)
const theme = createTheme({})

/* (application root) */
export default function App({ Component, pageProps }: AppProps<any>) {
  const { session } = pageProps
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  )
}