import { Box, Container, IconButton, Stack } from "@mui/material";
import { Revision, Page as PageData } from "@/isaac/models";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Header from "@/client/Header";
import ApiEndpoint from "@/isaac/api/APIEndpoint";
import API from "@/isaac/api/APIInterface";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useRouter } from "next/router";
import { Edit, Analytics } from "@mui/icons-material";
import Theme from "@/client/Theme";

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
    const router = useRouter();
    // const { data: session } = useSession();
    // const { success, metId } = usePageEngagement(session?.user as User, pageData.id as string);

    return (
        <>
            <Head>
                <title>{`${pageData.title} | ISAAC`}</title>
            </Head>
            <Header actions={
                <Stack direction="row">
                    <IconButton onClick={() => router.push(`/p/edit?page=${pageData.title}`)}>
                        <Edit htmlColor={Theme.COLOR.PRIMARY} />
                    </IconButton>
                    <IconButton onClick={() => router.push(`/p/analytics?page=${pageData.id}`)}>
                        <Analytics htmlColor={Theme.COLOR.PRIMARY} />
                    </IconButton>
                </Stack>
            } />
            <Container maxWidth="md">
                <h1>{pageData.title}</h1>
                <ReactMarkdown>
                    {revisionData.content}
                </ReactMarkdown>
                <FeedbackForm />
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
            Feedback Form Goes Here
        </Box>
    )
}