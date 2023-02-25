import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

export default function DirectToLogin() {
    return (
        <Button
            variant="contained"
            onClick={() => signIn()}
            sx={{
                flexGrow: 1,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >Sign In</Button>
    )
}
