import { Avatar, Box, Container, IconButton, Stack, TextField } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Search from '@mui/icons-material/Search';
import { ReactNode, useState } from 'react';

export default function Header(props: { actions?: ReactNode, disableSearchBar?: boolean, initialQuery?: string }) {
    const router = useRouter()
    return (
        <Box sx={{
            top: 0,
            backgroundColor: "#FFF",
            boxShadow: 5,
            width: "100%",
        }}>
            <Container maxWidth="md">
                <Stack spacing={2} direction="row" sx={{
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "right",
                }}>
                    <Stack spacing={0} direction="row">
                        <IconButton onClick={(e) => router.push("/")}>
                            <img height="32" width="32" src="https://ischool.uw.edu/sites/default/files/inline-images/logo-black-symbol2.jpg" />
                        </IconButton>
                        {props.actions}
                    </Stack>
                    <Box sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}>
                        {props.disableSearchBar ? null : <SearchBar initialQuery={props.initialQuery} />}
                    </Box>
                    <ProfileIcon />
                </Stack>
            </Container>
        </Box>
    )
}

function SearchBar(props: { initialQuery?: string }) {
    const router = useRouter()
    const [value, setValue] = useState<string>(props.initialQuery || "");
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

function ProfileIcon() {
    const { data: session } = useSession()
    if (!session) {
        return null
    }
    
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "right",
        }}>
            <IconButton onClick={(e) => {
                if (session) {
                    signOut()
                } else {
                    signIn()
                }
            }}>
                <Avatar src={session?.picture} />
            </IconButton>
        </Box>
    )
}