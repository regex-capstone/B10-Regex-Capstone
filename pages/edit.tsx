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
import { getStaticPaths } from "./category/[name]";
import { getStaticProps } from "./category/[name]";
import React, { useState, Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToMarkdown } from "draft-js-export-markdown";

// TODO: get static paths/props from the page being edited
// getStaticPaths(something)
// getStaticProps(something)

interface PageProps {
  pageData: string,
  revisionData: string
}

/* (root)/ */
export default function Edit(props: PageProps) {
    // TODO: get real data from api: need static paths/props
    // const pageData: PageData = JSON.parse(props.pageData) as PageData;
    // const revisionData: Revision = JSON.parse(props.revisionData) as Revision;

    const query = "";
    return (
        <>
            <Head>
                <title>{`Example Edit | ISAAC`}</title>
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
              />
            </Box>
            <Button onClick={() => {
              console.log(getMarkdown(editorState));
            }}>
              Save Changes
            </Button>
          </>
        )
    }

    function getMarkdown(rawData: any) {
      return stateToMarkdown(
        rawData.getCurrentContent()
      )
    }
}