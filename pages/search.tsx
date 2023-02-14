import { useRouter } from 'next/router';
import { Box, Button, Container, Stack, TextField, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import { Page } from '@/isaac/models';

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
    },
    {
      title: "Academic Support",
      page_category_id: "Academic Support",
    },
    {
      title: "Advising",
      page_category_id: "Advising",
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

function SearchBar(props: { query: string | string[] | undefined }) {
  const { query } = props;
  return (
    <Stack direction={'row'} spacing={2}>
      <TextField value={query} />
      <Button variant="contained">Search</Button>
    </Stack>
  )
}

function SearchResult(props: { result: Page, key: number }) {
  const { result, key } = props;
  return (
    <Box key={key}>
      <a href="#">{result.title}</a>
      <p>{result.page_category_id}</p>
    </Box>
  )
}