import { useRouter } from 'next/router';
import { Box, Container, Stack, FormControl, InputLabel, Select, OutlinedInput, Chip, MenuItem, Typography } from "@mui/material";
import { Page, Category } from '@/isaac/models';
import { useState, useEffect } from "react";
import { roundOff } from "@/client/utils/TimeUtils";
import useSearch from "@/hooks/useSearch";
import useCategory from "@/hooks/useCategory";
import API from '@/isaac/api/APIInterface';
import ApiEndpoint from '@/isaac/api/APIEndpoint';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { SearchResponse } from '@/isaac/search/SearchInterface';
import Head from 'next/head';
import Header from '@/client/Header';
import React from 'react';
import Link from 'next/link';
import Theme from '@/client/Theme';

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

export default function Search(props: SearchProps) {
    const [results, setResults] = useState<Page[]>(JSON.parse(props.results) as Page[]);
    const [categories, setCategories] = useState<Category[]>(JSON.parse(props.categories) as Category[]);
    const [timeElapsed, setTimeElapsed] = useState(props.time_elapsed);
    const [filteredResults, setFilteredResults] = useState<Page[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
        if (selectedCategories.length === 0) setFilteredResults(results)
        // TODO: Perform filtering
        // setFilteredResults(results.filter(page => selectedCategories.includes(/* page.category.name */)))
        setFilteredResults(results)
    }, [results, selectedCategories])

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
                <FeedbackForm />
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
            <Link href={`/p/${props.result.title}`}>
                <Typography fontSize="1.2rem" fontFamily="Encode Sans"><b>{props.result.title}</b></Typography>
            </Link>
            <Typography fontSize="0.8rem" color={Theme.COLOR.TEXT_DARK}>{props.result.description}</Typography>
        </Box>
    )
}

function FeedbackForm() {
    return (
        <Box sx={{
            marginTop: 2,
            marginBottom: 2,
            height: 200,
            backgroundColor: "gray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <>Feedback</>
        </Box>
    )
}