import SearchBar from "@/client/SearchBar";
import { Container, Stack, TextField } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import Logo from "@/client/Logo";
import Head from "next/head";
import { RichText } from "./[title]/edit";

export default function pageCreate() {
    return (
        <>
            <Head>
                <title>{`New Page | ISAAC`}</title>
            </Head>
            
            <Container>
                <Grid2 container spacing={2}>
                    <Grid2 xs={3}>
                        <Stack direction={'column'} spacing={2}>
                        <Logo />
                        </Stack>
                    </Grid2>
                    <Grid2 xs={6}>
                        <Stack direction={'column'} spacing={2}>
                        <SearchBar initialQuery={''} />
                        </Stack>
                    </Grid2>
                </Grid2>
                <TextField
                    onChange={(e) => logTitle(e.target.value)}
                    label="Page Title"
                    sx={{
                        flexGrow: 1,
                        marginTop: 10
                    }}
                />
                <RichText />
            </Container>
        </>
    )
}

function logTitle(title: string) {
    console.log(title)
}