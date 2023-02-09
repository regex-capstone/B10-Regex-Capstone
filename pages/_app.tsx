import { AppProps } from 'next/app'
import './global.css'

/* (application root) */
export default function App({ Component, pageProps }: AppProps<any>) {
  return <Component {...pageProps} />
}