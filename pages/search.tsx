import ApiEndpoint from "@/isaac/api/APIEndpoint";
import API from "@/isaac/api/APIInterface";
import { useRouter } from 'next/router';
import { Box, Button, Container, Stack, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { GetServerSidePropsResult } from "next";
import Grid2 from '@mui/material/Unstable_Grid2'
import { Page } from '@/isaac/models';
import SearchBar from '@/client/SearchBar';


const api: API = ApiEndpoint

interface SearchProps {
  results: Page[]
}

export async function getServerSideProps(context: any): Promise<GetServerSidePropsResult<SearchProps>> {
  const results: Page[] = await api.search(context.query.q);
  return {
    props: {
      results: results
    }
  }
}

/* (root)/search */
export default function Search(props: SearchProps) {
  const results: Page[] = props.results;

  const filters: string[] = [
    "Academic Planning",
    "Academic Support",
    "Advising",
    "Career Planning",
  ]

  const router = useRouter();
  const { q } = router.query as { q: string };
  return (
    <Container>
      <Grid2 container spacing={2}>
        <Grid2 xs={3}>
          <Stack direction={'column'} spacing={2}>
            <h1>ISAAC</h1>
            <Filters filters={filters}/>
          </Stack>
        </Grid2>
        <Grid2 xs={6}>
          <Stack direction={'column'} spacing={2}>
            <SearchBar initialQuery={q} />
            <i>{results.length} results</i>
            {results.map((result, i) => (
              <SearchResult result={result} key={i} />
            ))}
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  )
}

function Filters(props: { filters: string[] }) {
  const { filters } = props;
  return (
    <Box>
      <h3>Filters</h3>
      <Stack direction={'column'} spacing={2}>
        <FormGroup>
          {filters.map((filter, i) => (
            <FormControlLabel key={i} control={<Checkbox />} label={filter} />
          ))}
        </FormGroup>
      </Stack>
    </Box>
  )
}

function SearchResult(props: { result: Page }) {
  const { result} = props;
  return (
    <Box>
      <a href="#">{result.id}</a>
      <p>{result.page_category_id}</p>
    </Box>
  )
}