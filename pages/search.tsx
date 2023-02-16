import { useRouter } from 'next/router';
import { Box, Button, Container, Stack, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import { Page } from '@/isaac/models';
import SearchBar from '@/client/SearchBar';

/* (root)/search */
export default function Search() {
  const filters: string[] = [
    "Academic Planning",
    "Academic Support",
    "Advising",
    "Career Planning",
  ]

  const results: Page[] = [
    {
      title: "Academic Planning",
      page_category_id: "Academic Planning",
      headings: [],
      created_at: 80085
    },
    {
      title: "Academic Support",
      page_category_id: "Academic Support",
      headings: [],
      created_at: 80085
    },
    {
      title: "Advising",
      page_category_id: "Advising",
      headings: [],
      created_at: 80085
    },
  ]

  const router = useRouter();
  const { q } = router.query;
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
            <SearchBar query={q} />
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
      <a href="#">{result.title}</a>
      <p>{result.page_category_id}</p>
    </Box>
  )
}