import SearchBar from "@/client/SearchBar";
import { Container, Stack } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import API from "@/isaac/api/APIInterface";
import ApiEndpoint from "@/isaac/api/APIEndpoint";
import { Revision, Page as PageData } from "@/isaac/models";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Logo from "@/client/Logo";

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
    const api: API = ApiEndpoint
    const { title } = context.params ?? {};
    const pageData: PageData = await api.getPageByTitle(title as string)
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
    const pageData: PageData = JSON.parse(props.pageData) as PageData;
    const revisionData: Revision = JSON.parse(props.revisionData) as Revision;
    const query = "";
    return (
        <>
            <Head>
                <title>{`${pageData.title} | ISAAC`}</title>
            </Head>
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
                    </Grid2>
                    <Grid2 xs={3} sx={{
                        marginTop: 13,
                    }}>
                        <h3>Admin Tools</h3>
                        <Stack direction={'column'} spacing={2}>
                            <a href={`/page/${pageData.title}/edit`}>Edit Page</a>
                            <a href={`/page/${pageData.title}/analytics`}>Page Analytics</a>
                        </Stack>
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
    const { page, revision } = props;

    return (
        <Container>
            <ReactMarkdown>
                {revision.content}
            </ReactMarkdown>
        </Container>
    )
}