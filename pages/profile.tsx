import { Container, Stack, Avatar, Button, Select, MenuItem, Link, InputLabel, FormControl } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import Head from "next/head";
import { useSession } from "next-auth/react";
import { UserMajor, UserStanding } from "@/isaac/models/User";
import { useEffect, useState } from "react";
import User from '../isaac/models/User';
import { useRouter } from "next/router";
import useUser from "@/client/hooks/useUser";
import LoadingSpinner from "@/client/LoadingSpinner";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session } = useSession();
    const { data, error, isLoading } = useUser(session?.user.email as string);

    const [user, setUser] = useState({} as User);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (data) {
            setUser(data.user);
            setLoading(false);
        }

        return () => setLoading(true);
    }, [data]);

    const handleStandingChange = (e: any) => {
        setUser((prev: User) => {
            return {
                ...prev,
                standing: e.target.value
            }
        });
    }

    const handleMajorChange = (e: any) => {
        setUser((prev: User) => {
            return {
                ...prev,
                major: e.target.value
            }
        });
    }

    const handleSave = async () => {
        try {
            setSaving(true);

            const userRequest: User = {
                ...user,
                standing: user.standing,
                major: user.major
            }

            if (userRequest !== user) {
                const userOptions = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userRequest),
                }

                const postRequest = await fetch('/api/user', userOptions);
                await postRequest.json();
            }
            
            setSaving(false);
            router.push('/');
        } catch (err) {
            /* eslint-disable */
            // TODO: Replace with a proper error handling system
            console.error(err);
        }
    }

    if (isLoading || loading) return <LoadingSpinner />
    if (error) return <div>{error.message}</div>

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
                                        value={user.standing}
                                        label="Class Standing"
                                        onChange={handleStandingChange}
                                    >

                                        {
                                            Object.keys(UserStanding).map(s => {
                                                const value = (UserStanding as any)[s];
                                                return <MenuItem key={value} value={value}>{s}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="major-status-label">Major Status</InputLabel>
                                    <Select
                                        labelId="major-status-label"
                                        value={user.major}
                                        label="Class Standing"
                                        onChange={handleMajorChange}
                                    >
                                        {
                                            Object.keys(UserMajor).map(s => {
                                                const value = (UserMajor as any)[s];
                                                return <MenuItem key={value} value={value}>{s}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Stack direction={'column'} spacing={3} sx={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Stack direction={'row'} spacing={2}>
                                    {
                                        saving
                                            ? <p>Saving...</p>
                                            : <Button sx={{
                                                width: "fit-content"
                                            }} onClick={handleSave}>Save Changes</Button>
                                    }
                                    <Button sx={{
                                        width: "fit-content"
                                    }}>
                                        <Link href="/">Return to Home Page</Link>
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Container>
        </>
    )
}