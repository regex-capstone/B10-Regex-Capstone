import { Box, Container, Stack } from "@mui/material";
import { Revision, Page as PageData } from "@/isaac/models";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Header from "@/client/Header";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useRouter } from "next/router";
import Theme from "@/client/Theme";
import PublicAPIEndpoint from "@/isaac/public/PublicAPI";
import { GetPageTypes } from "@/isaac/public/api/Page";
import { SortType } from "@/isaac/public/SortType";
import { GetRevisionTypes } from "@/isaac/public/api/Revision";


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
            <Header actions={
                <Stack direction="row">
                    {/* <IconButton onClick={() => router.push(`/p/edit?page=${pageData.title}`)}>  // TODO Ryan handle
                        <Edit htmlColor={Theme.COLOR.PRIMARY} />
                    </IconButton> */}
                    {/* <IconButton onClick={() => router.push(`/p/analytics?page=${pageData.id}`)}>    // TODO keith handle
                        <Analytics htmlColor={Theme.COLOR.PRIMARY} />
                    </IconButton> */}
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