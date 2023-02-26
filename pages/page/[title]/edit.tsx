import SearchBar from "@/client/SearchBar";
import { Container, Stack, Link, Button } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import API from "@/isaac/api/APIInterface";
import ApiEndpoint from "@/isaac/api/APIEndpoint";
import { Revision, Page as PageData } from "@/isaac/models";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import Logo from "@/client/Logo";
import { Box } from "@mui/material";
import { getStaticPaths } from "../../category/[name]";
import React, { useState, Component } from 'react';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// @ts-ignore
import { stateToMarkdown } from "draft-js-export-markdown";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'
// TODO: get static paths/props from the page being edited
// getStaticPaths(something)
// getStaticProps(something)

/**
 * This library does not allow for server-side rendering... To accommodate for SSR, let's consider another library.
 */
const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

interface PageProps {
  pageData: string,
  revisionData: string
}

/* (root)/ */
export default function Edit(props: any) {
    // TODO: get real data from api: need static paths/props
    // const pageData: PageData = JSON.parse(props.pageData) as PageData;
    // const revisionData: Revision = JSON.parse(props.revisionData) as Revision;
    // const { title } = context.params ?? {};
    const router = useRouter();
    const { title } = router.query;
    const query = "";

    return (
        <>
            <Head>
                <title>{`Editing ${title} | ISAAC`}</title>
            </Head>
            <Container>
                <Grid2 container spacing={2}>
                    <Grid2 xs={3}>
                        <Stack direction={'column'} spacing={2}>
                            <Logo />
                            <Stack direction={'column'} spacing={2}>
                              <h2>Content</h2>
                            </Stack>
                        </Stack>
                    </Grid2>
                    <Grid2 xs={6}>
                        <Stack direction={'column'} spacing={2}>
                            <SearchBar initialQuery={query} />
                            <RichText />
                        </Stack>
                    </Grid2>
                    <Grid2 xs={3} sx={{
                        marginTop: 13,
                    }}>
                        <h3>Admin Tools</h3>
                        <Stack direction={'column'} spacing={2}>
                            <Link href={`/edit`}>Edit Page</Link>
                            <Link href={`/analytics`}>Page Analytics</Link>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Container>
        </>
    )

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

    function RichText() {
        const [editorState, setEditorState] = useState(
            () => EditorState.createEmpty(),
        );

        return (
          <>
            <header className="text-header">
              Rich Text Editor Example
            </header>
            <Box sx={{
              border: '1px solid black'
            }}>
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbar={{
                  options: ['inline', 'blockType', 'list', 'link', 'emoji', 'history'],
                  inline: {
                    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
                  },
                  list: {
                    options: ['unordered, ordered']
                  },
                  link: {
                    options: ['link']
                  }
                }}
              />
            </Box>
            <Stack direction={'row'} spacing={1}>
              <Button onClick={() => {
                // call the fetch function
                console.log(getMarkdown(editorState));
                // console.log(typeof(getMarkdown(editorState)));
                }}>
                Save Changes
              </Button>
              <Button href={`/page/${title}`}>
                Back to Page
              </Button>
            </Stack>
          </>
        )
    }

    function getMarkdown(rawData: any) {
      return stateToMarkdown(
        rawData.getCurrentContent()
      )
    }
}
