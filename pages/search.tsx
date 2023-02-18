import ApiEndpoint from "@/isaac/api/APIEndpoint";
import API from "@/isaac/api/APIInterface";
import { useRouter } from 'next/router';
import { Box, Button, Container, Stack, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { GetServerSidePropsResult, GetServerSidePropsContext } from "next";
import Grid2 from '@mui/material/Unstable_Grid2'
import { Page, Category } from '@/isaac/models';
import { useState, useEffect } from "react";
import SearchBar from '@/client/SearchBar';


const api: API = ApiEndpoint

interface SearchProps {
  results: Page[],
  categories: Category[]
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<SearchProps>> {
  const results: Page[] = await api.search(context.query.q as string);
  const categories: Category[] = await api.getAllCategories()
  return {
    props: {
      results: results,
      categories: categories
    }
  }
}

/* (root)/search */
export default function Search(props: SearchProps) {
  const results: Page[] = props.results;
  const categories: string[] = JSON.parse(JSON.stringify(props.categories.map(c => c.name))) as string[];
  const [filter, setFilter] = useState([]);
  let filteredResults: Page[] = results;



  const router = useRouter();
  const { q } = router.query as { q: string };
  return (
    <Container>
      <Grid2 container spacing={2}>
        <Grid2 xs={3}>
          <Stack direction={'column'} spacing={2}>
            <h1>ISAAC</h1>
            <Filters categories={categories}/>
          </Stack>
        </Grid2>
        <Grid2 xs={6}>
          <Stack direction={'column'} spacing={2}>
            <SearchBar initialQuery={q} />
            <i>{filteredResults.length} results</i>
            {filteredResults.map((result, i) => (
              <SearchResult result={result} key={i} />
            ))}
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  )
}

function Filters(props: { categories: string[] }) {
  const { categories } = props;
  return (
    <Box>
      <h3>Filters</h3>
      <Stack direction={'column'} spacing={2}>
        <FormGroup>
          {categories.map((category, i) => (
            <FormControlLabel key={i} control={<Checkbox />} label={category}/>
          ))}
        </FormGroup>
      </Stack>
    </Box>
  )
}

function FilterResults() {

}

function SearchResult(props: { result: Page }) {
  const { result } = props;
  return (
    <Box>
      <h1>{result.title}</h1>
      <a href="#">{result.id}</a>
      <p>{result.page_category_id}</p>
    </Box>
  )
}