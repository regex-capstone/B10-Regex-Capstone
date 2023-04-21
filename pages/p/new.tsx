import SearchBar from "@/client/SearchBar";
import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import Logo from "@/client/Logo";
import Head from "next/head";
import QuillTextEditor from "@/client/QuillEditor";
import { useState } from "react";
import useCategory from "@/client/hooks/useCategory";
import LoadingSpinner from "@/client/LoadingSpinner";

/*
    Path: /p/new

    This page uses CSG. It is not statically generated at build time.
*/
export default function CreatePage() {
    const [categoryId, setCategoryId] = useState('');
    const [title, setTitle] = useState('');
    const { data: categoriesData } = useCategory();

    if (!categoriesData) {
        return <LoadingSpinner />
    }

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
                                    categoriesData.map(cat => {
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
                                <QuillTextEditor
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