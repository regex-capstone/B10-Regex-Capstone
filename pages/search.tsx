import ApiEndpoint from "@/isaac/api/APIEndpoint";
import API from "@/isaac/api/APIInterface";
import { useRouter } from 'next/router';
import { Box, Container, Stack, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { GetServerSidePropsResult, GetServerSidePropsContext } from "next";
import Grid2 from '@mui/material/Unstable_Grid2'
import { Page, Category } from '@/isaac/models';
import { useState, useEffect } from "react";
import SearchBar from '@/client/SearchBar';
import Logo from "@/client/Logo";
import { SearchResponse } from "@/isaac/search/SearchInterface";
import { roundOff } from "@/client/utils/TimeUtils";

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<SearchProps>> {
    const api: API = ApiEndpoint;
    const searchResponse: SearchResponse = await api.search((context.query.q ?? "") as string);
    const categories: Category[] = (await api.getAllCategories());
    const secondsElapsed: number = roundOff(searchResponse.time_elapsed / 1000);
    return {
        props: {
            results: JSON.stringify(searchResponse.pages),
            categories: JSON.stringify(categories),
            time_elapsed: secondsElapsed
        }
    }
}

interface SearchProps {
    results: string,
    categories: string,
    time_elapsed: number
}

/* (root)/search */
export default function Search(props: SearchProps) {
    const results: Page[] = JSON.parse(props.results) as Page[];
    const categories: Category[] = JSON.parse(props.categories) as Category[];
    const timeElapsed: number = props.time_elapsed;
    let [catFilter, setFilter] = useState([] as string[]);
    let [filteredResults, setFilteredResults] = useState(results);

    useEffect(() => {   // need to run every time filter changes
        console.log('results');
        if (catFilter.length != 0) {
            setFilteredResults(results.filter(result => catFilter.includes(result.page_category_id as string)));
        } else { // if no filters applied
            setFilteredResults(results) //set filteredResults to all results
        }
    }, [catFilter]);

    const router = useRouter();
    const { q } = router.query as { q: string };
    return (
        <Container>
            <Grid2 container spacing={2}>
                <Grid2 xs={3}>
                    <Stack direction={'column'} spacing={2}>
                        <Logo />
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
                        <i>
                            {filteredResults.length} results ({timeElapsed} seconds)
                        </i>
                        {
                            filteredResults.map((result, i) => (
                                <SearchResult result={result} key={i} />
                            ))
                        }
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
        if (event.target.checked) {   // need to toggle based on if box is checked or unchecked
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
                    {
                        categories.map((category, i) => (
                            <FormControlLabel
                                key={i}
                                control={<Checkbox onChange={(e) => handleFilter(e, category)} />} // handle when this changes
                                label={JSON.parse(JSON.stringify(category.name as string))} // pull names from category
                            />
                        ))
                    }
                </FormGroup>
            </Stack>
        </Box>
    )
}

function SearchResult(props: { result: Page }) {
    const { result } = props;
    return (
        <Box>
            <h1>
                <a href={`/page/${result.title}`}>{result.title}</a>
            </h1>
            {
                result.description
                    ? <p>{result.description}</p>
                    : <p>No description</p>
            }
            <p>{result.page_category_id}</p>
        </Box>
    )
}