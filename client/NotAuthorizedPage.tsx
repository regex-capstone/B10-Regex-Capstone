import { Button, Container } from "@mui/material";
import { signIn } from "next-auth/react";

export default function NotAuthorizedPage(props: { requireLogIn?: boolean, requireAdmin?: boolean } ) {
    const requireLogIn = props.requireLogIn;
    const requireAdmin = props.requireAdmin;

    if (requireLogIn) {
        return (
            <Container>
                <Button
                    variant="contained"
                    onClick={() => signIn()}
                >Sign In</Button>
            </Container>
        )
    } else if (requireAdmin) {
        return (
            <Container>
                <h1>Only admins have access to this resource... Please head back to the main page.</h1>
            </Container>
        )
    }

    return (
        <>
        </>
    )
}
