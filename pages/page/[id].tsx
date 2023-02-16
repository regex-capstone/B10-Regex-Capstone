import SearchBar from "@/client/SearchBar";
import { Container, Stack } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import { useRouter } from "next/router";
import { Page as PageData } from "@/isaac/models";

/* (root)/page/[id] */
export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const query = "";
  const page: PageData = {
    title: "Academic Planning",
    headings: [],
    created_at: 80085,
    page_category_id: "Academic Planning"
  }
  return (
    <Container>
      <Grid2 container spacing={2}>
        <Grid2 xs={3}>
          <Stack direction={'column'} spacing={2}>
            <h1>ISAAC</h1>
            <ContentTable page={page} />
          </Stack>
        </Grid2>
        <Grid2 xs={6}>
          <Stack direction={'column'} spacing={2}>
            <SearchBar query={query} />
            <Content page={page} />
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