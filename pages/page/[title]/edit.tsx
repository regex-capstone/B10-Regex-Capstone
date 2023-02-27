import SearchBar from "@/client/SearchBar";
import { Container, Stack, Link, Button } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import Head from "next/head";
import Logo from "@/client/Logo";
import { Box } from "@mui/material";
import React, { useState, Component, useEffect } from 'react';
import { ContentState, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// @ts-ignore
import { stateToMarkdown } from "draft-js-export-markdown";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'
import { RevisionRequest } from "@/isaac/models/Revision";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import ApiEndpoint from "@/isaac/api/APIEndpoint";
import API from "@/isaac/api/APIInterface";
import { Page as PageData, Revision as RevisionData } from '@/isaac/models';
import LoadingSpinner from "@/client/LoadingSpinner";
// TODO: get static paths/props from the page being edited
// getStaticPaths(something)
// getStaticProps(something)

/**
 * This library does not allow for server-side rendering... To accommodate for SSR, let's consider another library.
 */
const Editor = dynamic<EditorProps>(
    // @ts-ignore
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

const loadingTextArr = [
    'Redirecting you back to the page.',
    'Redirecting you back to the page..',
    'Redirecting you back to the page...'
]

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
    const [isLoading, setLoading] = useState(false);
    const [isRendered, setRendered] = useState(false);
    const [loadingText, setLoadingText] = useState(loadingTextArr[0]);
    const router = useRouter();
    const { title } = router.query;
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
                            <title>{`Editing ${title} | ISAAC`}</title>
                        </Head>
                        <Container>
                            <Grid2 container spacing={2}>
                                <Grid2 xs={3}>
                                    <Stack direction={'column'} spacing={2}>
                                        <Logo />
                                        <Button href={`/page/${title}`} sx={{
                                            width: 'fit-content'
                                        }}>
                                            Back to Page
                                        </Button>
                                    </Stack>
                                </Grid2>
                                <Grid2 xs={6}>
                                    <Stack direction={'column'} spacing={2}>
                                        <SearchBar initialQuery={query} />
                                        {
                                            isLoading
                                                ? <h1>{loadingText}</h1>
                                                : <RichText />
                                        }
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

    function RichText() {
        const [editorState, setEditorState] = useState(
            revisionData.content
                ? EditorState.createWithContent(ContentState.createFromText(revisionData.content))
                : EditorState.createEmpty()
        );
        const [textInterval, setTextInterval] = useState<NodeJS.Timeout | null>(null);

        useEffect(() => {
            return () => {
                if (textInterval) {
                    clearInterval(textInterval);
                }
            }
        }, [])

        const handleSave = async () => {
            setLoading(true);

            let textIndex = 0;

            setTextInterval(setInterval(() => {
                setLoadingText(loadingTextArr[textIndex % 3]);
                textIndex++;
            }, 200));

            const request: RevisionRequest = {
                content: getMarkdown(editorState),
                rev_page_id: pageData.id as string
            }

            const options = {
                // The method is POST because we are sending data.
                method: 'POST',
                // Tell the server we're sending JSON.
                headers: {
                    'Content-Type': 'application/json',
                },
                // Body of the request is the JSON data we created above.
                body: JSON.stringify(request),
            }

            const response = await fetch('/api/revision', options);
            const data = await response.json();
            // redirect to the page we just edited
            router.push(`/page/${title}`);
        }

        return (
            <>
                <header className="text-header">
                    Rich Text Editor Example
                </header>
                <Box sx={{
                    border: '1px solid black'
                }}>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        toolbar={{
                            options: ['inline', 'blockType', 'list', 'link', 'emoji', 'history'],
                            inline: {
                                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
                            },
                            list: {
                                options: ['unordered, ordered']
                            },
                            link: {
                                options: ['link']
                            }
                        }}
                    />
                </Box>
                <Button onClick={handleSave}>
                    {
                        isLoading
                            ? loadingText
                            : 'Save Changes'
                    }
                </Button>
            </>
        )
    }

    function getMarkdown(rawData: any) {
        return stateToMarkdown(
            rawData.getCurrentContent()
        )
    }
}
