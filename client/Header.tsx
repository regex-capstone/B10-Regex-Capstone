import { Avatar, Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import Theme from '@/client/Theme';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Search from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { ReactNode, useState } from 'react';

export default function Header(props: { actions?: ReactNode, disableSearchBar?: boolean}) {
    const router = useRouter()
    const { data: session } = useSession()
    return (
        <Box sx={{
            top: 0,
            backgroundColor: "#FFF",
            boxShadow: 5,
            width: "100%",
        }}>
            <Stack spacing={2} direction="row" sx={{
                display: "flex",
                alignItems: "left",
                justifyContent: "right",
            }}>
                <Stack spacing={0} direction="row" sx={{
                    flex: 1,
                }}>
                    <IconButton onClick={(e) => router.push("/")}>
                        <img height="32" width="32" src="https://ischool.uw.edu/sites/default/files/inline-images/logo-black-symbol2.jpg" />
                    </IconButton>
                    { props.actions }
                </Stack>
                <Box sx={{
                    flex: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}>
                    { props.disableSearchBar ? null : <SearchBar />}
                </Box>
                <Box sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "right",
                }}>
                    <IconButton onClick={(e) => router.push("/profile")}>
                        <Avatar src={session?.picture} />
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    )
}

function SearchBar() {
    const router = useRouter()
    const [value, setValue] = useState<string>("");
    return (
        <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault()
                    router.push(`/search?q=${value}`)
                }
            }}
            variant="standard"
            InputProps={{
                disableUnderline: true,
                endAdornment: <IconButton onClick={(e) => router.push(`/search?q=${value}`)}><Search fontSize='small' /></IconButton>,
            }}
            sx={{
                paddingLeft: "0.5rem",
                height: "2rem",
                border: "1px solid #DDD",
                width: "100%",
            }}
        />
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
                        <b>{session?.user.name.toUpperCase()}</b>
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