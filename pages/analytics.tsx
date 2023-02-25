import SearchBar from "@/client/SearchBar";
import { Button, Container, Stack } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import API from "@/isaac/api/APIInterface";
import ApiEndpoint from "@/isaac/api/APIEndpoint";
import { Revision, Page as PageData } from "@/isaac/models";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Logo from "@/client/Logo";
import { Box } from "@mui/material";
import { getStaticPaths } from "./category/[name]";
import { getStaticProps } from "./category/[name]";
import { width } from "@mui/system";
import { wrap } from "module";
import Link from "next/link";

// TODO: get static paths/props from the page being edited
// getStaticPaths(something)
// getStaticProps(something)

interface PageProps {
  pageData: string,
  revisionData: string
}

/* (root)/ */
export default function Analytics(props: PageProps) {
    // TODO: get real data from api: need static paths/props
    // const pageData: PageData = JSON.parse(props.pageData) as PageData;
    // const revisionData: Revision = JSON.parse(props.revisionData) as Revision;

    const query = "";
    return (
        <>
            <Head>
                <title>{`Example Analytics | ISAAC`}</title>
            </Head>
            <Container>
                <Grid2 container spacing={2}>
                    <Grid2 xs={1}>
                    </Grid2>
                    <Grid2 xs={10} sx={{
                        marginTop: 13
                    }}>
                        <Stack direction={'column'} spacing={2}>
                            <h1>Heading 1</h1>
                            <Stack direction={"row"} spacing={1}>
                                <select style={{width: 80,}} name="filter1">
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
                                <select style={{width: 80,}} name="filter2">
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
                                <select style={{width: 80,}} name="filter3">
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
                            </Stack>
                            <Box sx={{
                                border: "1px solid black",
                                p: 30,
                            }}></Box>
                            <Link href={`/edit`}>
                                <Button sx={{
                                    justifyContent: "left",
                                    width: 126,
                                    border: "1px solid black",
                                    color: "black"
                                }}>Back to Page</Button>
                            </Link>
                        </Stack>
                    </Grid2>
                    <Grid2 xs={1}>
                    </Grid2>
                </Grid2>
            </Container>
        </>
    )
}