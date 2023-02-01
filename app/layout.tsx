import './global.css'

/**
 * Application root layout.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
      <body>{children}</body>
    </html>
  )
}
