import SearchBar from "@/client/SearchBar";
import { Button, Container, Stack } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import { Revision, Page as PageData } from "@/isaac/models";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Logo from "@/client/Logo";
import Header from "@/client/Header";
import { SortType } from "@/isaac/public/PublicAPI";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import usePageEngagement from "@/client/hooks/usePageEngagement";
import PublicAPIEndpoint from "@/isaac/public/PublicAPI";
import { GetPageTypes } from "@/isaac/public/api/Page";
import { GetRevisionTypes } from "@/isaac/public/api/Revision";

const api = PublicAPIEndpoint;

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const pages: PageData[] = (await api.Page.get(GetPageTypes.ALL_PAGES, SortType.NONE) as PageData[]);
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
    const api = PublicAPIEndpoint;
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
                        <AdminTools page={pageData} />
                    </Grid2>
                </Grid2>
            </Container>
        </>
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