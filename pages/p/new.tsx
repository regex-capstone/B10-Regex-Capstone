import SearchBar from "@/client/SearchBar";
import { Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import Logo from "@/client/Logo";
import Head from "next/head";
import QuillTextEditor from "@/client/QuillEditor";
import { useEffect, useState } from "react";
import Category from '../../isaac/models/Category';
import { useRouter } from "next/router";
import Header from "@/client/Header";

const loadingTextArr = [
    'SAVING.',
    'SAVING..',
    'SAVING...'
]

export default function CreatePage() {
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);

    const [content, setContent] = useState('');
    const [category, setCategory] = useState<string>('');

    const [title, setTitle] = useState('');

    const [loadingText, setLoadingText] = useState(loadingTextArr[0]);
    const [textInterval, setTextInterval] = useState<NodeJS.Timeout | null>(null);
    const [isSaving, setSaving] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetch('/api/category?sort_type=alphabetical')
            .then(res => res.json())
            .then(data => setCategories(data.payload));

        return () => {
            if (textInterval) {
                clearInterval(textInterval);
            }
        }
    });

    const handleSave = async () => {
        // handle loading text
        setSaving(true);

        let textIndex = 0;

        setTextInterval(setInterval(() => {
            setLoadingText(loadingTextArr[textIndex % 3]);
            textIndex++;
        }, 200));

        // process saving page
        const clientRequestPage = {
            title: title,
            category: categoryId,
        }

        const pageOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientRequestPage)
        }

        const pageResponse = await fetch('/api/page', pageOptions);
        const pageData = await pageResponse.json();

        if (!pageData.success) {
            window.alert("ERROR CREATING PAGE.");
        }

        const createdPage = pageData.payload;

        // page created
        // now create revision created by user
        const clientRequestRevision = {
            content: content
        }

        const revisionOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientRequestRevision)
        }

        const revisionResponse = await fetch(`/api/revision/page/${createdPage.slug}`, revisionOptions);
        const revisionData = await revisionResponse.json();

        if (!revisionData.success) {
            window.alert("ERROR CREATING REVISION.");
        }

        await fetch(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}&path=/p/${createdPage.slug}`);

        await router.push({
            pathname: '/redirect',
            query: { path: `p/${createdPage.slug}` }
        });

        setSaving(false);
    }

    return (
        <>
            <Head>
                <title>{`Create New Page | ISAAC`}</title>
            </Head>
            <Header />
            <Container>
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
                                    categories.map((category: Category) => (
                                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        {
                            title && categoryId
                                ?
                                <QuillTextEditor
                                    setContentCallback={setContent}
                                    title={title}
                                    categoryId={categoryId}
                                />
                                : <></>
                        }
                        <Button onClick={handleSave}>
                            {
                                isSaving
                                    ? loadingText
                                    : 'SAVE'
                            }
                        </Button>
                    </Stack>
                </Grid2>
            </Container>
        </>
    )
}