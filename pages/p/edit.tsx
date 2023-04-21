import SearchBar from "@/client/SearchBar";
import { Container, Stack, Button } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import Head from "next/head";
import Logo from "@/client/Logo";
import QuillTextEditor from "@/client/QuillEditor";
import { useRouter } from "next/router";
import usePage from "@/client/hooks/usePage";
import useRevision from "@/client/hooks/useRevision";
import { UserRole } from "@/isaac/models/User";

/* /p/edit?page=[title] */
export default function Edit() {
    const router = useRouter();
    const { page: title } = router.query;

    const { data: pageData } = usePage(title as string);
    const { data: revisionData } = useRevision(title as string);

    return (
        <>
            <Head>
                <title>{`Editing ${title} | ISAAC`}</title>
            </Head>
            { !pageData || !revisionData ? <h1>Loading...</h1> :
                <Container>
                    <Grid2 container spacing={2}>
                        <Grid2 xs={3}>
                            <Stack direction={'column'} spacing={2}>
                                <Logo />
                                <Button href={`/p/${pageData.title}-${pageData.id}`} sx={{  // TODO: fix this with the title update
                                    width: 'fit-content'
                                }}>
                                    Back to Page
                                </Button>
                            </Stack>
                        </Grid2>
                        <Grid2 xs={6}>
                            <Stack direction={'column'} spacing={2}>
                                <SearchBar initialQuery={""} />
                                <QuillTextEditor
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

// ADMIN only
Edit.auth = {
    role: UserRole.ADMIN
}
