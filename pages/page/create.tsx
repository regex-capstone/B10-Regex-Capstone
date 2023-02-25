import SearchBar from "@/client/SearchBar";
import { Container, Stack } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import Logo from "@/client/Logo";
import Head from "next/head";

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
                <h1>Make a new Page here!</h1>
            </Container>
        </>
    )
}