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
  const categories: Category[] = props.categories;
  let [catFilter, setFilter] = useState([] as string[]);
  let [filteredResults, setFilteredResults] = useState(results);

  useEffect(() => {   // need to run every time filter changes
    if(catFilter.length != 0) {
      console.log("change!");
      setFilteredResults(results.filter(result => catFilter.includes(result.page_category_id)));
    } else { // if no filters applied
      setFilteredResults(results) //set filteredResults to all results
    }
  }, [catFilter, results]);

  const router = useRouter();
  const { q } = router.query as { q: string };
  return (
    <Container>
      <Grid2 container spacing={2}>
        <Grid2 xs={3}>
          <Stack direction={'column'} spacing={2}>
            <h1>ISAAC</h1>
            <Filters 
              categories={categories}
              setFilter={setFilter}
              currFilter={catFilter}
            />
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

function Filters(props: { categories: Category[], setFilter: Function, currFilter: string[] }) {
  const { categories, setFilter, currFilter } = props;

  // onChange function to update filter list
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>, category: Category) => {
    if(event.target.checked){   // need to toggle based on if box is checked or unchecked
      let newFilter = currFilter.concat(category.id as string);
      setFilter(newFilter);
    } else {
      setFilter(currFilter.filter(i => i !== category.id as string));
    }
  }

  return (
    <Box>
      <h3>Filters</h3>
      <Stack direction={'column'} spacing={2}>
        <FormGroup>
          {categories.map((category, i) => (
            <FormControlLabel 
              key={i}
              control={<Checkbox onChange={(e) => handleFilter(e, category)}/>} // handle when this changes
              label={JSON.parse(JSON.stringify(category.name as string))} // pull names from category
            />
          ))}
        </FormGroup>
      </Stack>
    </Box>
  )
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