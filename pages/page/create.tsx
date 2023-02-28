import SearchBar from "@/client/SearchBar";
import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import Logo from "@/client/Logo";
import Head from "next/head";
import RichTextEditor from "@/client/RichTextEditor";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import ApiEndpoint from "@/isaac/api/APIEndpoint";
import API from "@/isaac/api/APIInterface";
import { Category as CategoryData, Page as PageData, Revision as RevisionData } from '@/isaac/models';
import { useState } from "react";

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<CreatePageProps>> {
    const api: API = ApiEndpoint;
    const categories: CategoryData[] = await api.getAllCategories();

    return {
        props: {
            categoryData: JSON.stringify(categories ?? {})
        },
        revalidate: 10
    }
}

interface CreatePageProps {
    categoryData: string;
}

export default function CreatePage(props: CreatePageProps) {
    const [categoryId, setCategoryId] = useState('');
    const [title, setTitle] = useState('');
    const categoryData = JSON.parse(props.categoryData) as CategoryData[];

    return (
        <>
            <Head>
                <title>{`Create New Page | ISAAC`}</title>
            </Head>
            <Container>
                <Grid2 container spacing={2}>
                    <Grid2 xs={3}>
                        <Stack direction={'column'} spacing={2}>
                            <Logo />
                        </Stack>
                    </Grid2>
                    <Grid2 xs={6}>
                        <Stack direction={'column'} spacing={2}>
                            <SearchBar initialQuery={''} />
                        </Stack>
                    </Grid2>
                </Grid2>
                <Grid2 xs={6}>
                    <Stack direction={'column'} spacing={2}>
                    <div>
                        {
                            title && categoryId
                                ? <h1>Please enter the page content.</h1>
                                : <h1>Please choose the dropdown options below to proceed.</h1>
                        }
                    </div>
                        <TextField fullWidth
                            onChange={(e) => setTitle(e.target.value)}
                            label="What is the page title?"
                            sx={{
                                flexGrow: 1,
                                marginTop: 10
                            }}
                        />
                        <FormControl fullWidth>
                            <InputLabel>What is the category?</InputLabel>
                            <Select
                                value={categoryId}
                                label="What is the page title?"
                                onChange={(e: SelectChangeEvent) => setCategoryId(e.target.value)}
                            >
                                {
                                    categoryData.map(cat => {
                                        return (
                                            <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        {
                            title && categoryId
                                ?
                                <RichTextEditor
                                    title={title}
                                    categoryId={categoryId}
                                />
                                : <></>
                        }
                    </Stack>
                </Grid2>
            </Container>
        </>
    )
}

function logTitle(title: string) {
    console.log(title)
}