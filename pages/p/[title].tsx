import SearchBar from "@/client/SearchBar";
import { Button, ButtonGroup, Container, Stack, Box, FormControl, FormLabel, FormControlLabel, TextField, Typography } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import { Revision, Page as PageData } from "@/isaac/models";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Logo from "@/client/Logo";
import Header from "@/client/Header";
import ApiEndpoint from "@/isaac/api/APIEndpoint";
import API from "@/isaac/api/APIInterface";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import usePageEngagement from "@/client/hooks/usePageEngagement";
import React, { useState } from 'react';
import { ThemeProvider } from "@emotion/react";

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const api: API = ApiEndpoint
    const pages: PageData[] = await api.getAllPages()
    return {
        paths: pages.map(page => {
            return {
                params: {
                    title: `${page.title}-${page.id}`
                }
            }
        }),
        fallback: 'blocking'
    }
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {
    const api: API = ApiEndpoint
    const { title } = context.params ?? {};
    const id = title?.toString().split('-').pop() ?? ""
    const pageData: PageData = await api.getPageById(id)
    const revisionData: Revision = await api.getRecentPageRevisionById(pageData.id as string)

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
    usePageEngagement(pageData.id as string);
    const query = "";

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
                            <ContentTable page={pageData} />
                        </Stack>
                    </Grid2>
                    <Grid2 xs={6}>
                        <Stack direction={'column'} spacing={2}>
                            <SearchBar initialQuery={query} />
                            <Content page={pageData} revision={revisionData} />
                        </Stack>
                        <Box>
                            <FeedbackSection />
                        </Box>
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

function ContentTable(props: { page: PageData }) {
    const { page } = props;
    const headings = page.headings ?? [];

    return (
        <Stack direction={'column'}>
            <h3>Content</h3>
            <Stack direction={'column'} spacing={2}>
                {headings.map((heading, i) => (
                    <a href={`#${heading}`} key={i}>{heading.text}</a>
                ))}
            </Stack>
        </Stack>
    )
}

function Content(props: { page: PageData, revision: Revision }) {
    const { revision } = props;
    return (
        <Container>
            <ReactMarkdown>
                {revision.content}
            </ReactMarkdown>
        </Container>
    )
}

function AdminTools(props: { page: PageData }) {
    const { page } = props;
    const router = useRouter();
    const { data: session } = useSession();

    if (!session || !session.isAdmin) {
        return (<></>);
    }

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
  
    return (
        <div
      style={{
        backgroundColor: '#D3D3D3',
        color: '#ffeff',
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
            {isHelpful === null ? (
        <ButtonGroup>
          <Button variant="contained" style={{width: '60px', height: 'fit-content', backgroundColor: 'black', borderRadius: 0, marginRight: '0.1rem' }} onClick={handleYesButtonClick}>
            Yes
          </Button>
          <Button variant="contained" style={{width: '60px', height: 'fit-content', backgroundColor: 'black', borderRadius: 0 }} onClick={handleNoButtonClick}>
            No
          </Button>
        </ButtonGroup>
            ) : isHelpful ? (
                <Typography variant="h6" color="textPrimary" style={{ fontWeight: 'bold' }}>Thank you for your feedback!</Typography>
            ) : isSubmitted ? (
                <Typography variant="h6" color="textPrimary" style={{ fontWeight: 'bold' }}>Thank you for your feedback!</Typography>
            ) : (
                <form onSubmit={handleSubmitFeedback} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%' }}>
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
                    style={{ marginRight: '1rem', flex: 1, flexGrow: 7 }}
                    helperText={`${feedbackText.length}/${CHARACTER_LIMIT}`}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: 'fit-content' }}>
                    <Button type="submit" variant="contained" color="primary" 
                        style={{
                            width: '80px',
                            height: 'fit-content',
                            backgroundColor: 'black',
                            borderRadius:0,
                            marginLeft: '1rem',
                            marginBottom: '1rem'
                        }} 
                        onClick={handleYesButtonClick}>
                        
                        Submit
                    </Button>
                </div>
            </form>

            )}
            </Stack>
        </Stack>
      </>
      </div>
    );
  };




  