import { Box, Typography } from "@mui/material"
import Link from "next/link"
import Theme from "./Theme"

export default function Logo() {
  return (
    <Link href="/" style={{
      textDecoration: 'none',
    }}>
      <Box sx={{
        color: Theme.COLOR.TEXT_DARK,
        fontSize: '2rem',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1rem',
        letterSpacing: '1rem',
      }}>
        <b>ISAAC</b>
      </Box>
    </Link>
  )
}