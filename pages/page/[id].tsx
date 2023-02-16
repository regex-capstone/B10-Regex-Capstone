import SearchBar from "@/client/SearchBar";
import { Container, Stack } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import API from "@/isaac/api/APIInterface";
import ApiEndpoint from "@/isaac/api/APIEndpoint";
import { Revision, Page as PageData } from "@/isaac/models";

const api: API = ApiEndpoint

export async function getStaticPaths(context: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const pages: PageData[] = await api.getPages()
  const ids: string[] = pages.map(page => page.id)
  return {
    paths: ids.map(id => {
      return {
        params: {
          id: id
        }
      }
    }),
    fallback: false
  }
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {
  const { id } = context.params ?? {};
  const pageData: PageData = await api.getPage(id as string)
  const revisionData: Revision = await api.getRecentPageRevision(id as string)

  return {
    props: {
      // NextJS requires props to be serializable
      pageData: JSON.stringify(pageData),
      revisionData: JSON.stringify(revisionData)
    }
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
    <Container>
      <Grid2 container spacing={2}>
        <Grid2 xs={3}>
          <Stack direction={'column'} spacing={2}>
            <h1>ISAAC</h1>
            <ContentTable page={pageData} />
          </Stack>
        </Grid2>
        <Grid2 xs={6}>
          <Stack direction={'column'} spacing={2}>
            <SearchBar query={query} />
            <Content page={pageData} revision={revisionData} />
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  )
}

function ContentTable(props: { page: PageData }) {
  // TODO: Get headings from page content
  const headings = [
    "Heading1",
    "Heading2",
    "Heading3",
    "Heading4",
    "Heading5",
  ]

  return (
    <Stack direction={'column'}>
      <h3>Content</h3>
      <Stack direction={'column'} spacing={2}>
        {headings.map((heading, i) => (
          <a href={`#${heading}`} key={i}>{heading}</a>
        ))}
      </Stack>
    </Stack>
  )
}

function Content(props: { page: PageData, revision: Revision }) {
  const { page, revision } = props;

  // TODO: Figure out formatting of page content

  return (
    <Container>
      <h1>{page.title}</h1>
      <hr/>
      <p>{revision.content}</p>
    </Container>
  )
}