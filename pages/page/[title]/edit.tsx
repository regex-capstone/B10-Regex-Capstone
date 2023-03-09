import SearchBar from "@/client/SearchBar";
import { Container, Stack, Button } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import Head from "next/head";
import Logo from "@/client/Logo";
import React from 'react';
import LoadingSpinner from "@/client/LoadingSpinner";
import RichTextEditor from "@/client/RichTextEditor";
import { useRouter } from "next/router";
import usePage from "@/client/hooks/usePage";

/* (root)/ */
export default function Edit() {
    const router = useRouter();
    const { data, error, isLoading } = usePage(router.query.title as string);

    if (isLoading) return <LoadingSpinner />
    if (error) return <div>{error.message}</div>

    const pageData = data.page;
    const revisionData = data.revision;

    const query = "";

    return (
        <>
            <Head>
                <title>{`Editing ${pageData.title} | ISAAC`}</title>
            </Head>
            <Container>
                <Grid2 container spacing={2}>
                    <Grid2 xs={3}>
                        <Stack direction={'column'} spacing={2}>
                            <Logo />
                            <Button href={`/page/${pageData.title}`} sx={{
                                width: 'fit-content'
                            }}>
                                Back to Page
                            </Button>
                        </Stack>
                    </Grid2>
                    <Grid2 xs={6}>
                        <Stack direction={'column'} spacing={2}>
                            <SearchBar initialQuery={query} />
                            <RichTextEditor 
                                pageData={pageData}
                                revisionData={revisionData}
                            />
                        </Stack>
                    </Grid2>
                    <Grid2 xs={3}>
                    </Grid2>
                </Grid2>
            </Container>
        </>
    )
}
