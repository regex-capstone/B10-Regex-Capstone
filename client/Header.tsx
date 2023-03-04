import { Container, Box, Button, Typography } from '@mui/material';
import Theme from '@/client/Theme';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession()

  return (
    <Box sx={{
      backgroundColor: Theme.COLOR.BACKGROUND_DARK,
      color: Theme.COLOR.TEXT_LIGHT,
      width: '100%',
      padding: 0,
      margin: 0,
      height: '2em',
      display: 'flex',
      justifyContent: 'flex-end',
    }}>
      <Box sx={{
        // outline: "1px solid red",
        alignItems: "center",
        display: "flex",
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
      }}>
        <Typography fontSize={'1rem'}>
          <b>{session?.user.name.toUpperCase() ?? 'GUEST'}</b>
        </Typography>
      </Box>
      <Button variant="text" sx={{
        color: Theme.COLOR.SECONDARY,
        borderRadius: 0,
        // outline: "1px solid red",
      }}>
        {
          session ? (
            <Box onClick={() => signOut()}>
              <Typography fontSize={'1rem'}>
                <b>Sign Out</b>
              </Typography>
            </Box>
          ) : (
            <Box onClick={() => signIn()}>
              <Typography fontSize={'1rem'}>
                <b>Sign In</b>
              </Typography>
            </Box>
          )
        }
      </Button>
    </Box>
  )
}