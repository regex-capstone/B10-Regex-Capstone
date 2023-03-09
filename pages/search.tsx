import { useRouter } from 'next/router';
import { Box, Container, Stack, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import { Page, Category } from '@/isaac/models';
import { useState, useEffect } from "react";
import SearchBar from '@/client/SearchBar';
import Logo from "@/client/Logo";
import { roundOff } from "@/client/utils/TimeUtils";
import useSearch from "@/hooks/useSearch";
import LoadingSpinner from "@/client/LoadingSpinner";
import useCategory from "@/hooks/useCategory";
import API from '@/isaac/api/APIInterface';
import ApiEndpoint from '@/isaac/api/APIEndpoint';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { SearchResponse } from '@/isaac/search/SearchInterface';

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
    const [results, setResults] = useState<Page[]>(JSON.parse(props.results) as Page[]);
    const [categories, setCategories] = useState<Category[]>(JSON.parse(props.categories) as Category[]);
    const [timeElapsed, setTimeElapsed] = useState(props.time_elapsed);
    const [catFilter, setFilter] = useState([] as string[]);
    const [filteredResults, setFilteredResults] = useState<Page[]>([]);

    const router = useRouter();
    const { q } = router.query as { q: string };
    const { data: searchData } = useSearch(q);
    const { data: categoryData } = useCategory();
    const [cachedQuery, setCachedQuery] = useState(q);

    useEffect(() => {
        if (searchData && q !== cachedQuery) {
            const freshPages = searchData.pages;
            const timeElapsed = roundOff(searchData.time_elapsed / 1000);

            setCachedQuery(q);
            setResults(freshPages);
            setTimeElapsed(timeElapsed);
        }
    }, [searchData, cachedQuery, q])

    useEffect(() => {
        if (categoryData) {
            setCategories(categoryData);
        }
    }, [categoryData])

    useEffect(() => { 
        setFilteredResults(filterResults(results, catFilter));
    }, [results, catFilter]);
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
                        <SearchResultList results={filteredResults} timeElapsed={timeElapsed} />
                    </Stack>
                </Grid2>
            </Grid2>
        </Container>
    )
}

function SearchResultList(props: { results: Page[], timeElapsed: number }) {
    const { results, timeElapsed } = props;

    if (timeElapsed == -1) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <>
            <div>
                {
                    !timeElapsed
                        ? <></>
                        : <i>
                            {results.length} results ({timeElapsed} seconds)
                        </i>
                }
            </div>
            {
                results.map((result, i) => (
                    <SearchResult result={result} key={i} />
                ))
            }
        </>
    );
}

function Filters(props: { categories: Category[], setFilter: Function, currFilter: string[] }) {
    const { categories, setFilter, currFilter } = props;
    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>, category: Category) => {
        if (event.target.checked) {
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

function filterResults(results: Page[], catFilter: string[]) {
    return (results && catFilter.length != 0)
        ? results.filter(result => catFilter.includes(result.page_category_id as string))
        : results;
}
