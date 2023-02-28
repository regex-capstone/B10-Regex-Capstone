import SearchBar from "@/client/SearchBar";
import { Container, Stack, Button } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import Head from "next/head";
import Logo from "@/client/Logo";
import React, { useEffect, useState } from 'react';
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import ApiEndpoint from "@/isaac/api/APIEndpoint";
import API from "@/isaac/api/APIInterface";
import { Page as PageData, Revision as RevisionData } from '@/isaac/models';
import LoadingSpinner from "@/client/LoadingSpinner";
import RichTextEditor from "@/client/RichTextEditor";

// @TODO: double check this with Alan to optimize the pre-rendering
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const api: API = ApiEndpoint
    const pages: PageData[] = await api.getAllPages()
    return {
        paths: pages.map(page => {
            return {
                params: {
                    title: page.title
                }
            }
        }),
        fallback: false
    }
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {
    const api: API = ApiEndpoint;
    const { title } = context.params ?? {};
    const pageData: PageData = await api.getPageByTitle(title as string);
    const revisionData: RevisionData = await api.getRecentPageRevisionById(pageData.id as string);

    return {
        props: {
            // NextJS requires props to be serializable
            pageData: JSON.stringify(pageData ?? {}),
            revisionData: JSON.stringify(revisionData ?? {})
        },
        revalidate: 10
    }
}

interface PageProps {
    pageData: string,
    revisionData: string
}

/* (root)/ */
export default function Edit(props: PageProps) {
    const pageData: PageData = JSON.parse(props.pageData) as PageData;
    const revisionData: RevisionData = JSON.parse(props.revisionData) as RevisionData;
    const [isRendered, setRendered] = useState(false);
    const query = "";

    useEffect(() => {
        setRendered(true);
    }, []);

    return (
        <>
            {
                !isRendered
                    ? <LoadingSpinner />
                    : <>
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
            }
        </>
    )
}
