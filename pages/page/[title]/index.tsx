import SearchBar from "@/client/SearchBar";
import { Button, Container, Stack } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import { Revision, Page as PageData } from "@/isaac/models";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Logo from "@/client/Logo";
import Header from "@/client/Header";
import ApiEndpoint from "@/isaac/api/APIEndpoint";
import API from "@/isaac/api/APIInterface";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { UserRole } from "@/isaac/models/User";

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
        fallback: 'blocking'
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
    const pageData: PageData = JSON.parse(props.pageData);
    const revisionData: Revision = JSON.parse(props.revisionData);
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

    if (session?.user.role !== UserRole.ADMIN) {
        return <></>;
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
                <Link href={`/page/${page.title}/edit`}>Edit</Link>
                <Link href={`/page/${page.title}/analytics`}>Analytics</Link>
                <Button onClick={e => onDelete(page.title as string)}>Delete</Button>
            </Stack>
        </>
    )
}