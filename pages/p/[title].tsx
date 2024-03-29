import { Box, Button, Container, Stack, TextField, Typography, IconButton } from "@mui/material";
import { Revision, Page as PageData } from "@/isaac/models";
import Head from "next/head";
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
import { Edit, Analytics } from "@mui/icons-material";
import Theme from "@/client/Theme";
import { useSession } from "next-auth/react";
import DOMPurify from 'isomorphic-dompurify';
import useSWR from "swr";
import { MetricPageClickAggType } from "@/isaac/public/api/MetricPageClick";

const api = PublicAPIEndpoint;

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    // const pages: PageData[] = (await api.Page.get(GetPageTypes.ALL_PAGES, SortType.NONE) as PageData[]);
    const aggregation = (await api.MetricPageClick.aggregate(MetricPageClickAggType.TRENDING_PAGES));
    let pages = aggregation.map((e: any) => e.page[0]);
    pages = pages.filter((e: any) => e !== undefined);
    return {
        paths: pages.map((page: PageData) => {
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
    const pageData: PageData = (await api.Page.get(GetPageTypes.PAGE_BY_SLUG, SortType.NONE, { p_slug: slug as string }) as PageData);
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
    const session = useSession();
    const pageData: PageData = JSON.parse(props.pageData);
    const revisionData: Revision = JSON.parse(props.revisionData);
    // const [revisionData, setRevisionData] = useState<Revision>(JSON.parse(props.revisionData));
    const router = useRouter();

    // const { data: rawRevisionData } = useSWR(`/api/revision/page/${pageData.slug}/recent`, (url: string) => fetch(url).then(res => res.json()));

    const [openDialog, setOpenDialog] = useState(false);

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
    });

    // useEffect(() => {
    //     if (rawRevisionData) {
    //         console.log(rawRevisionData);
    //         setRevisionData(rawRevisionData.payload);
    //     }
    // }, [rawRevisionData])

    return (
        <>
            <Head>
                <title>{`${pageData.title} | ISAAC`}</title>
            </Head>
            {
                !session.data
                    ? <Header />
                    : <Header actions={
                        <Stack direction="row">
                            <IconButton onClick={() => setOpenDialog(true)}>
                                <Edit htmlColor={Theme.COLOR.PRIMARY} />
                            </IconButton>
                            <IconButton onClick={() => router.push('/p/analytics?slug=' + pageData.slug)}>
                                <Analytics htmlColor={Theme.COLOR.PRIMARY} />
                            </IconButton>
                        </Stack>
                    } />
            }
            <Container maxWidth="md">
                <Stack className="ql-snow" direction={'column'} spacing={2}>
                    <Content page={pageData} revision={revisionData} />
                    <QuillEditorDialog
                        openDialog={openDialog}
                        setOpenDialogCallback={setOpenDialog}
                        revisionData={revisionData}
                        pageData={pageData}
                    />
                    <FeedbackSection pageId={pageData.id as string} />
                </Stack>

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

        setIsSubmitted(true);
    };

    return (
        <Box sx={{
            backgroundColor: '#fff',
            padding: '1rem',
            width: '100%',
            height: '155px',
            boxSizing: 'border-box',
            zIndex: 1,
            border: '1px solid #E0E0E0',
        }}>
            <>
                <Stack direction={'column'} spacing={2}>
                    <Typography color="textPrimary">Did you find this helpful?</Typography>
                    <Stack direction={'row'} spacing={2}>
                        {isHelpful === null ? (
                            <Stack spacing={1} direction="row">
                                <Button color="primary" variant="contained" style={{ width: '60px', height: 'fit-content', borderRadius: 5, marginRight: '0.1rem' }} onClick={handleYesButtonClick}>
                                    Yes
                                </Button>
                                <Button color="primary" variant="contained" style={{ width: '60px', height: 'fit-content', borderRadius: 5 }} onClick={handleNoButtonClick}>
                                    No
                                </Button>
                            </Stack>
                        ) : isHelpful ? (
                            <Typography variant="h6" color="textPrimary" style={{ fontWeight: 'bold' }}>Thank you for your feedback!</Typography>
                        ) : isSubmitted ? (
                            <Typography variant="h6" color="textPrimary" style={{ fontWeight: 'bold' }}>Thank you for your feedback!</Typography>
                        ) : (
                            <form onSubmit={handleSubmitFeedback} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%' }}>
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
                                    style={{ marginRight: '1rem', flex: 1 }}
                                    helperText={`${feedbackText.length}/${CHARACTER_LIMIT}`}
                                />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', width: 'fit-content' }}>
                                    <Button type="submit" variant="contained" color="primary"
                                        style={{
                                            width: '80px',
                                            height: 'fit-content',
                                            borderRadius: 5,
                                            marginLeft: '1rem',
                                            marginBottom: '2rem'
                                        }}
                                        onClick={handleSubmitFeedback}>

                                        Submit
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Stack>
                </Stack>
            </>
        </Box>
    )

}

function Content(props: { page: PageData, revision: Revision }) {
    const { page, revision } = props;
    const html = DOMPurify.sanitize(revision.content);

    return (
        <>
            <Typography fontSize={'2rem'} fontWeight={'bold'} sx={{
                marginTop: '1rem',
            }}>
                {page.title}
            </Typography>
            <hr />
            <Container className="ql-editor" dangerouslySetInnerHTML={{ __html: html }} />
        </>
    )
}