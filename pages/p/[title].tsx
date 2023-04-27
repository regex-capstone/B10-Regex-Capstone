import { Button, ButtonGroup, Container, Stack, Box, FormControl, FormLabel, FormControlLabel, TextField, Typography } from "@mui/material";
import { Revision, Page as PageData } from "@/isaac/models";
import Grid2 from '@mui/material/Unstable_Grid2';
import SearchBar from "@/client/SearchBar";
import Head from "next/head";
import Logo from "@/client/Logo";
import Header from "@/client/Header";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useRouter } from "next/router";
import PublicAPIEndpoint from "@/isaac/public/PublicAPI";
import { GetPageTypes } from "@/isaac/public/api/Page";
import { SortType } from "@/isaac/public/SortType";
import { GetRevisionTypes } from "@/isaac/public/api/Revision";
import React, { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import QuillEditorDialog from "@/client/QuillEditorDialog";

const api = PublicAPIEndpoint;

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const pages: PageData[] = (await api.Page.get(GetPageTypes.ALL_PAGES, SortType.NONE) as PageData[]);
    return {
        paths: pages.map(page => {
            return {
                params: {
                    title: `${page.slug}`
                }
            }
        }),
        fallback: 'blocking'
    }
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {
    const { title: slug } = context.params ?? {};
    // const id = slug?.toString().split('-').pop() ?? ""
    const pageData: PageData = (await api.Page.get(GetPageTypes.PAGE_BY_SLUG, SortType.NONE, { p_slug: slug as string }) as PageData);
    // TODO: why is this Revision and not RevisionData - is the *Data suffix a needed convention?
    const revisionData: Revision = (await api.Revision.get(GetRevisionTypes.REVISIONS_BY_PAGE_SLUG, SortType.RECENTLY_CREATED, { p_slug: slug as string }) as Revision[])[0];

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

/* (root)/page/[id] */
export default function Page(props: PageProps) {
    const pageData: PageData = JSON.parse(props.pageData);
    const revisionData: Revision = JSON.parse(props.revisionData);

    useEffect(() => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }
        fetch(`/api/metric/page_click/${pageData.id}`, options)
            .then(response => response.json())
            .then(data => console.log(data));
    }, []);

    return (
        <>
            <Head>
                <title>{`${pageData.title} | ISAAC`}</title>
            </Head>
            <Header />
            <Container>
                <Grid2 container spacing={2}>
                    <Grid2 xs={3}>
                        <Stack direction={'column'} spacing={2}>
                            <Logo />
                        </Stack>
                    </Grid2>
                    <Grid2 xs={6}>
                        <Stack className="ql-snow" direction={'column'} spacing={2}>
                            <SearchBar />
                            <Content page={pageData} revision={revisionData} />
                            <QuillEditorDialog 
                                revisionData={revisionData}
                                pageData={pageData}
                            />
                            <FeedbackSection pageId={pageData.id as string} />
                        </Stack>
                    </Grid2>
                    <Grid2 xs={3} sx={{
                        marginTop: 13,
                    }}>
                    </Grid2>
                </Grid2>
            </Container>
        </>
    )
}

interface FeedbackSectionProps {
    pageId: string;
}

const FeedbackSection = (props: FeedbackSectionProps) => {
    const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const CHARACTER_LIMIT = 250;

    // TODO maybe cookie to save the user's response on an article?
    const handleYesButtonClick = () => {
        const clientRequest = {
            is_helpful: true
        }

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientRequest)
        }

        fetch(`/api/metric/page_feedback/${props.pageId}`, fetchOptions)
            .then(response => response.json())
            .then(data => console.log(data));

        setIsHelpful(true); // Technically not needed
        setIsSubmitted(true);
    };

    const handleNoButtonClick = () => {
        setIsHelpful(false);
    };

    const handleSubmitFeedback = () => {
        const clientRequest = {
            user_feedback: feedbackText,
            is_helpful: isHelpful
        }

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientRequest)
        }

        fetch(`/api/metric/page_feedback/${props.pageId}`, fetchOptions)
            .then(response => response.json())
            .then(data => console.log(data));

        setIsSubmitted(true);
    };

    return (
        <div
            style={{
                backgroundColor: '#D3D3D3',
                color: '#fff',
                padding: '1rem',
                position: 'fixed',
                bottom: 1,
                width: '30%',
                height: '155px',
                boxSizing: 'border-box',
                zIndex: 9999,
                marginBottom: '2rem',
            }}
        >
            <>
                <Stack direction={'column'} spacing={2}>
                    <Typography color="textPrimary">Did you find this helpful?</Typography>
                    <Stack direction={'row'} spacing={2}>
                        {isHelpful === null ? ( // TODO clean this logic up
                            <ButtonGroup>
                                <Button variant="contained" style={{ width: '60px', height: 'fit-content', backgroundColor: 'black', borderRadius: 0, marginRight: '0.1rem' }} onClick={handleYesButtonClick}>
                                    Yes
                                </Button>
                                <Button variant="contained" style={{ width: '60px', height: 'fit-content', backgroundColor: 'black', borderRadius: 0 }} onClick={handleNoButtonClick}>
                                    No
                                </Button>
                            </ButtonGroup>
                        ) : isHelpful ? (
                            <Typography variant="h6" color="textPrimary" style={{ fontWeight: 'bold' }}>Thank you for your feedback!</Typography>
                        ) : isSubmitted ? (
                            <Typography variant="h6" color="textPrimary" style={{ fontWeight: 'bold' }}>Thank you for your feedback!</Typography>
                        ) : (
                            <form onSubmit={handleSubmitFeedback} style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TextField
                                    type="text"
                                    label="Please provide additional feedback"
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    value={feedbackText}
                                    onChange={(event) => setFeedbackText(event.target.value)}
                                    inputProps={{
                                        style: { fontSize: '1rem' },
                                        maxLength: CHARACTER_LIMIT
                                    }}
                                    style={{ marginRight: '1rem', width: '400px' }}
                                    helperText={`${feedbackText.length}/${CHARACTER_LIMIT}`}

                                />
                                <Button type="submit" variant="contained" color="primary"
                                    style={{
                                        width: '80px',
                                        height: 'fit-content',
                                        backgroundColor: 'black',
                                        borderRadius: 0,
                                        margin: '1.5rem'
                                    }}
                                    onClick={handleSubmitFeedback}>

                                    Submit
                                </Button>
                            </form>
                        )}
                    </Stack>
                </Stack>
            </>
        </div>
    )

}
  
function Content(props: { page: PageData, revision: Revision }) {
    const { revision } = props;
    return (
        <Container className="ql-editor" dangerouslySetInnerHTML={{ __html: revision.content }} />
    )
}