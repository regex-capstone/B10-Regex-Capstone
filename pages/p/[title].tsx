import { Button, ButtonGroup, Container, Stack, Box, FormControl, FormLabel, FormControlLabel, TextField, Typography } from "@mui/material";
import { Revision, Page as PageData } from "@/isaac/models";
import Grid2 from '@mui/material/Unstable_Grid2';
import SearchBar from "@/client/SearchBar";
import Head from "next/head";
import Logo from "@/client/Logo";
import Header from "@/client/Header";
import Link from "next/link";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useRouter } from "next/router";
import Theme from "@/client/Theme";
import PublicAPIEndpoint from "@/isaac/public/PublicAPI";
import { GetPageTypes } from "@/isaac/public/api/Page";
import { SortType } from "@/isaac/public/SortType";
import { GetRevisionTypes } from "@/isaac/public/api/Revision";
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
// import usePageEngagement from "@/client/hooks/usePageEngagement";
import QuillEditorDialog from "@/client/QuillEditorDialog";
import 'quill/dist/quill.snow.css';

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
    const { title } = context.params ?? {};
    const id = title?.toString().split('-').pop() ?? ""
    const pageData: PageData = (await api.Page.get(GetPageTypes.PAGE_BY_ID, SortType.NONE, { p_id: id }) as PageData);
    // TODO: why is this Revision and not RevisionData - is the *Data suffix a needed convention?
    const revisionData: Revision = (await api.Revision.get(GetRevisionTypes.RECENT_REVISION_OF_PAGE_ID, SortType.NONE, { p_id: pageData.id as string }) as Revision);

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
    const router = useRouter();
    // const { data: session } = useSession();
    // const { success, metId } = usePageEngagement(session?.user as User, pageData.id as string);

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
                            <FeedbackForm />
                        </Stack>
                    </Grid2>
                    <Grid2 xs={3} sx={{
                        marginTop: 13,
                    }}>
                        <AdminTools page={pageData} />
                    </Grid2>
                </Grid2>
            </Container>
        </>
    )
}

function FeedbackForm() {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50vh",
            backgroundColor: Theme.COLOR.BACKGROUND_DARK,
            color: Theme.COLOR.TEXT_LIGHT,
        }}>
        <FeedbackSection />
        </Box>
    )
}


const FeedbackSection = () => {
    const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const CHARACTER_LIMIT = 250;
  
    const handleYesButtonClick = () => {
      setIsHelpful(true);
    };
  
    const handleNoButtonClick = () => {
      setIsHelpful(false);
    };
  
    const handleSubmitFeedback = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Do something with the feedback text, such as storing it in a database or displaying a confirmation message
      setFeedbackText('');
      setIsHelpful(null);
      setIsSubmitted(true);
    };

    return(
        <div style={{
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
        }} >
            <Stack direction={'column'} spacing={2}>
                <Typography color="textPrimary">Did you find this helpful?</Typography>
                <Stack direction={'row'} spacing={2}>
                {isHelpful === null ? (
            <ButtonGroup>
            <Button variant="contained" style={{width: '60px', height: 'fit-content', backgroundColor: 'black', borderRadius:0, marginRight: '0.1rem' }} onClick={handleYesButtonClick}>
                Yes
            </Button>
            <Button variant="contained" style={{width: '60px', height: 'fit-content', backgroundColor: 'black', borderRadius:0 }} onClick={handleNoButtonClick}>
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
                            borderRadius:0,
                            margin: '1.5rem' 
                        }} 
                        onClick={handleYesButtonClick}>
                        
                        Submit
                    </Button>
                    </form>
                )}
                </Stack>
            </Stack>
        </div>
    )

}
  
function Content(props: { page: PageData, revision: Revision }) {
    const { revision } = props;
    return (
        <Container className="ql-editor" dangerouslySetInnerHTML={{ __html: revision.content }} />
    )
}

function AdminTools(props: { page: PageData }) {
    const { page } = props;
    const router = useRouter();
    const { data: session } = useSession();

    // if (!session || !session.isAdmin) {
    //     return (<></>);
    // }

    const onDelete = async (title: string) => {
        await fetch(`/api/page/${title}`, {
            method: 'DELETE'
        })
        router.push('/')
    }   

    return (
        <>
            <h3>Admin Tools</h3>
            <Stack direction={'column'} spacing={2}>
                <Link href={`/p/edit?page=${page.title}`}>Edit</Link>
                <Link href={`/p/analytics?page=${page.title}`}>Analytics</Link>
                <Button onClick={e => onDelete(page.title as string)}>Delete</Button>
            </Stack>
        </>
    );
  };