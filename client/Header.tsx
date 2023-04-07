import { Box, Button, Typography } from '@mui/material';
import Theme from '@/client/Theme';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
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
            <ProfileComponent />
        </Box>
    )
}

function ProfileComponent() {
    const { data: session } = useSession();

    const boxStyle = {
        // outline: "1px solid red",
        alignItems: "center",
        display: "flex",
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
    }

    const buttonStyle = {
        color: Theme.COLOR.SECONDARY,
        borderRadius: 0,
        // outline: "1px solid red",
    }

    if (!session) {
        return (
            <>
                <Box sx={boxStyle}>
                    <Typography fontSize={'1rem'}>
                            <b>GUEST</b>
                    </Typography>
                </Box>
                <Button variant="text" sx={buttonStyle}>
                    <Box onClick={() => signIn()}>
                        <Typography fontSize={'1rem'}>
                            <b>Sign In</b>
                        </Typography>
                    </Box>
                </Button>
            </>
        )
    }

    return (
        <>
            <Box sx={boxStyle}>
                <Typography fontSize={'1rem'}>
                    <Link href="/profile" style={{
                        textDecoration: 'none',
                        color: Theme.COLOR.TEXT_LIGHT,
                    }}>
                        <b>{session?.name.toUpperCase()}</b>
                    </Link>
                </Typography>
            </Box>
            <Button variant="text" sx={buttonStyle}>
                <Box onClick={() => signOut()}>
                    <Typography fontSize={'1rem'}>
                        <b>Sign Out</b>
                    </Typography>
                </Box>
            </Button>
        </>
    )
}