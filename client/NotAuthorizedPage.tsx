import { Button, Container, Stack } from "@mui/material";
import { signIn } from "next-auth/react";

export default function NotAuthorizedPage(props: { requireLogIn?: boolean, requireAdmin?: boolean } ) {
    const requireLogIn = props.requireLogIn;
    const requireAdmin = props.requireAdmin;

    if (requireLogIn) {
        return (
            // make a centered button with @mui/material's Stack component
            <Container>
                <Stack
                    spacing={2}
                    direction="column"
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <h1>You must be logged in to access this resource... Please log in.</h1>
                    <Button
                        onClick={() => signIn()}
                        variant="contained"
                        color="primary"
                    >
                        Log in
                    </Button>
                </Stack>
            </Container>
            
        )
    } else if (requireAdmin) {
        return (
            <Container>
                <Stack
                    spacing={2}
                    direction="column"
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <h1>You must be an admin to access this resource... Please head back to the main page.</h1>
                    <Button
                        href="/"
                        variant="contained"
                        color="primary"
                    >
                        Back to main page
                    </Button>
                </Stack>
            </Container>
        )
    }

    return (
        <>
        </>
    )
}
