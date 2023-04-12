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
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, NextApiRequest, NextApiResponse } from 'next';
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import User, { UserRole } from "@/isaac/models/User";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/isaac/auth/next-auth/AuthOptions";
import { useEffect } from "react";
import usePageEngagement from "@/hooks/usePageEngagement";

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
    const { data: session } = useSession();
    const pageData: PageData = JSON.parse(props.pageData);
    const revisionData: Revision = JSON.parse(props.revisionData);
    const { success, metId } = usePageEngagement(session?.user as User, pageData.id as string);
    const query = "";

    useEffect(() => {
        console.log(`page tracked: ${metId}`);
    }, [success])

    return (
        <>
            <Head>
                <title>{`${pageData.title} | ISAAC`}</title>
            </Head>
            <Header />
        </>
    )
}