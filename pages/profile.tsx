import Logo from "@/client/Logo";
import { Container, Stack, Avatar, Button, Box, Select, MenuItem, Link, InputLabel, FormControl } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import Head from "next/head";
import { useSession } from "next-auth/react";
import { UserMajor, UserStanding } from "@/isaac/models/User";
import { useState } from "react";
import User from '../isaac/models/User';

export default function ProfilePage() {
    const { data: session } = useSession();
    const [standing, setStanding] = useState((session) ? session.user.standing : UserStanding.UNKNOWN);
    const [major, setMajor] = useState((session) ? session.user.major : UserMajor.UNKNOWN);

    const handleStandingChange = (e: any) => {
        setStanding(e.target.value);
    }

    const handleMajorChange = (e: any) => {
        setMajor(e.target.value);
    }

    const handleSave = async () => {
        if (session) {
            const userRequest: User = {
                ...session.user,
                standing: standing,
                major: major
            }


            const userOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userRequest),
            }

            const pagePayload = await (await fetch('/api/user', userOptions)).json();
        }
    }

    return (
        <>
            <Head>
                <title>{`Profile Page | ISAAC`}</title>
            </Head>

            <Container>
                <Grid2 container spacing={2}>
                    <Grid2 xs>
                        <Stack direction={'column'} spacing={2} sx={{ width: 1 }}>
                            <Stack direction={'row'} spacing={2} sx={{ 
                                width: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Avatar alt="<username>" src={session?.picture} sx={{
                                    width: 150,
                                    height: 150,
                                }}></Avatar>
                                <h1>{session?.user.name}</h1>
                                <h1>{session?.user.role.toUpperCase()}</h1>
                            </Stack>
                            <h2>Academic Information</h2>
                            <Stack direction={'column'} spacing={3} sx={{
                                paddingLeft: 10
                            }}>
                                <FormControl fullWidth>
                                    <InputLabel id="class-standing-label">Class Standing</InputLabel>
                                    <Select
                                        labelId="class-standing-label"
                                        value={standing}
                                        label="Class Standing"
                                        onChange={handleStandingChange}
                                    >

                                        {
                                            Object.keys(UserStanding).map(s => {
                                                return <MenuItem value={(UserStanding as any)[s]}>{s}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="major-status-label">Major Status</InputLabel>
                                    <Select
                                        labelId="major-status-label"
                                        value={major}
                                        label="Class Standing"
                                        onChange={handleMajorChange}
                                    >
                                        {
                                            Object.keys(UserMajor).map(s => {
                                                return <MenuItem value={(UserMajor as any)[s]}>{s}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Stack direction={'column'} spacing={3} sx={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Button sx={{
                                    width: "fit-content"
                                }} onClick={handleSave}>Save Changes</Button>
                                <Button sx={{
                                    width: "fit-content"
                                }}>
                                    <Link href="/">Return to Home Page</Link>
                                </Button>

                            </Stack>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Container>
        </>
    )
}