import { Button } from "@mui/material";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginComponent() {
    const { data: session } = useSession();
    
    if (session) {
        return (
            <>
                <Button
                    variant="contained"
                    onClick={() => signOut()}
                    sx={{
                        flexGrow: 1
                    }}
                >Sign Out</Button>
            </>
        )
    }

    return (
        <>
        </>
    )
}