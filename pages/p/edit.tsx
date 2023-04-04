import SearchBar from "@/client/SearchBar";
import { Container, Stack, Button } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import Head from "next/head";
import Logo from "@/client/Logo";
import { useEffect, useState } from 'react';
import RichTextEditor from "@/client/RichTextEditor";
import { useRouter } from "next/router";
import { Page, Revision } from "@/isaac/models";

/* /p/edit?page=[title] */
export default function Edit() {
    const router = useRouter();
    const { page } = router.query;

    const [pageData, setPageData] = useState<Page | undefined>(undefined);
    const [revisionData, setRevisionData] = useState<Revision | undefined>(undefined);

    useEffect(() => {
        fetch(`/api/page/${page}`)
            .then(response => response.json())
            .then(data => setPageData(data))
            .catch(() => setPageData(undefined));
        fetch(`/api/revision/${page}`)
            .then(response => response.json())
            .then(data => setRevisionData(data));
    }, [page]);

    return (
        <>
            <Head>
                <title>{`Editing ${page} | ISAAC`}</title>
            </Head>
            {pageData === undefined || revisionData === undefined ? <h1>Loading...</h1> :
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
                                <SearchBar initialQuery={""} />
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
            }
        </>
    )
}
