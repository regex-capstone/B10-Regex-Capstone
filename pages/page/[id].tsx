import SearchBar from "@/client/SearchBar";
import { Container, Stack } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import { useRouter } from "next/router";
import { Page as PageData } from "@/isaac/models";
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import NetworkHandler from '@/client/network/NetworkHandler'
import GetPagesRequest from "@/client/network/requests/GetPagesRequest";
import GetPageRequest from "@/client/network/requests/GetPageRequest";
import API from "@/isaac/api/APIInterface";
import ApiEndpoint from "@/isaac/api/APIEndpoint";

const api: API = ApiEndpoint

// TODO: Get paths from server API directly instead of fetch
export async function getStaticPaths(context: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const pages: PageData[] = await api.getPages()
  const ids: string[] = pages.map(page => page.id)
  console.log(ids);
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

// TODO: Get page data from server API directly instead of fetch
export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {
  const { id } = context.params ?? {};
  if (!id) {
    throw new Error("No page id provided");
  }

  const pageData: PageData = await api.getPage(id as string)

  return {
    props: {
      // NextJS requires props to be serializable
      pageData: JSON.stringify(pageData)
    }
  }
}

interface PageProps {
  pageData: string
}

/* (root)/page/[id] */
export default function Page(props: PageProps) {
  const pageData: PageData = JSON.parse(props.pageData) as PageData;
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
            <Content page={pageData} />
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  )
}

function ContentTable(props: { page: PageData }) {
  // TODO: Get headings from page content
  const headings = [
    "Academic Planning",
    "Academic Support",
    "Advising",
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

function Content(props: { page: PageData }) {
  const { page } = props;

  // TODO: Get content from page data
  return (
    <Container>
      <h1>{page.title}</h1>
      <hr />
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad  , quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h2>Heading 2</h2>
      <hr />
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad  , quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h3>Heading 3</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad  , quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </Container>
  )
}