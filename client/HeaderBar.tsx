import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import LoginComponent from './LoginComponent';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function HeaderBar() {
    const { data: session } = useSession();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box>
                        {
                            session ? (
                                <h1>Welcome, {session.user.name}</h1>
                            ) : <></>
                        }
                    </Box>
                    <LoginComponent />
                </Toolbar>
            </Container>
        </AppBar>
    );
}