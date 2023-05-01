import { Favorite } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            style={{
                paddingBottom: '25px'
            }}
        >
            <Typography
                style={{
                    textAlign: 'center',
                    opacity: 0.5,
                }}
            >
                &#169; Team Regex 2023
            </Typography>
        </Box>
    )
}