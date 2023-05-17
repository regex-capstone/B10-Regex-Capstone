import { useRouter } from 'next/router';
import { Box, Container, Stack, FormControl, InputLabel, Select, OutlinedInput, Chip, MenuItem, Typography } from "@mui/material";
import { Page, Category } from '@/isaac/models';
import { useState, useEffect } from "react";
import { roundOff } from "@/client/utils/TimeUtils";
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Header from '@/client/Header';
import React from 'react';
import Link from 'next/link';
import Theme from '@/client/Theme';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { GetCategoryTypes } from '@/isaac/public/api/Category';
import { SortType } from '@/isaac/public/SortType';
import { SearchResponse } from '@/isaac/services/search/SearchInterface';

/**
 * Uses SSG to generate the search result page on the first load.
 */
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<SearchProps>> {
    const api = PublicAPIEndpoint;
    const searchResponse: SearchResponse = await api.Search.search((context.query.q ?? "") as string);
    const categories: Category[] = (await api.Category.get(GetCategoryTypes.ALL_CATEGORIES, SortType.ALPHABETICAL) as Category[]);
    const secondsElapsed: number = roundOff(searchResponse.time_elapsed / 1000);

    return {
        props: {
            results: JSON.stringify(searchResponse.results),
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

export default function Search(props: SearchProps) {
    const [results, setResults] = useState<Page[]>(JSON.parse(props.results) as Page[]);
    const [categories, setCategories] = useState<Category[]>(JSON.parse(props.categories) as Category[]);
    const [timeElapsed, setTimeElapsed] = useState(props.time_elapsed);
    const [filteredResults, setFilteredResults] = useState<Page[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const router = useRouter();
    const { q } = router.query as { q: string };
    const [cachedQuery, setCachedQuery] = useState(q);

    const [reload, setReload] = useState(false);

    useEffect(() => {
        if (reload) {
            fetch('/api/category?sort_type=alphabetical')
                .then(res => res.json())
                .then(data => setCategories(data.payload));
    
            fetch('/api/search/' + q)
                .then(res => res.json())
                .then(data => {
                    const freshPages = data.payload.results;
                    const timeElapsed = roundOff(data.payload.time_elapsed / 1000);
    
                    setCachedQuery(q);
                    setResults(freshPages);
                    setTimeElapsed(timeElapsed);
                });
    
            setReload(false);
        }
    }, [reload, q]);

    useEffect(() => {
        if (q !== cachedQuery) {  // handle re-search
            setCachedQuery(q);
            setReload(true);
        }
    }, [cachedQuery, q])

    useEffect(() => {
        if (selectedCategories.length === 0) {
            setFilteredResults(results);
        }  
        else {
            /*
             *  So, selectedCategories contains an array of strings which are the
             *  names of the currently selected categories. Page contains the id
             *  of its category, under .category. This code converts the names of
             *  the selected categories to their ids, and filters for the pages
             *  whose category ids are in that array.
             */
            const selectedCategoryIds = selectedCategories.map((name) => {
                const cat = categories.find((cat) => cat.name === name);
                return cat?.id;
            })
            setFilteredResults(results.filter((page) => {
                return selectedCategoryIds.includes(page.category as string)
            }));
        }
    })

    return (
        <>
            <Head>
                <title>ISAAC | {q}</title>
            </Head>
            <Header initialQuery={q} />
            <Container maxWidth="xl">
                <SearchFilters categories={categories} selected={selectedCategories} setSelected={setSelectedCategories} />
                <i>{filteredResults.length} results ({timeElapsed} seconds)</i>
                <SearchResults results={filteredResults} />
            </Container>
        </>
    )
}

function SearchFilters(props: { categories: Category[], selected: string[], setSelected: (selected: string[]) => void }) {
    const [selected, setSelected] = [props.selected, props.setSelected]
    return (
        <Box sx={{
            marginTop: 2,
            marginBottom: 2,
        }}>
            <FormControl sx={{
                width: "100%"
            }}>
                <InputLabel>Filters</InputLabel>
                <Select
                    multiple
                    value={selected}
                    onChange={(e) => {
                        setSelected(e.target.value as string[]);
                    }}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((name) => (
                                <Chip key={name} label={name} />
                            ))}
                        </Box>
                    )}
                >
                    {props.categories.map((cat) => (
                        <MenuItem
                            key={cat.name}
                            value={cat.name}
                        >
                            {cat.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

function SearchResults(props: { results: Page[] }) {
    return (
        <Stack direction="column" spacing={2} sx={{
            marginTop: 2,
            marginBottom: 2,
        }}>
            {props.results.map((result) => <Result key={result.id} result={result} />)}
        </Stack>
    )
}

function Result(props: { result: Page }) {
    return (
        <Box>
            {/* { props.result.category } */}
            <Link href={`/p/${props.result.slug}`}>
                <Typography fontSize="1.2rem" fontFamily="Encode Sans"><b>{props.result.title}</b></Typography>
            </Link>
            <Typography fontSize="0.8rem" color={Theme.COLOR.TEXT_DARK}>{props.result.description}</Typography>
        </Box>
    )
}