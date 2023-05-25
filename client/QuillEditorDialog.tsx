import QuillTextEditor from "@/client/QuillEditor";
import Dialog from '@mui/material/Dialog';
import { Button, Container, FormControl, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Page as PageData, Revision as RevisionData } from '@/isaac/models';
import { Category } from "@/isaac/models"
import { useRouter } from "next/router";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

interface QuillTextEditorProps {
    openDialog: boolean;
    setOpenDialogCallback: (open: boolean) => void;
    pageData: PageData;
    revisionData: RevisionData;
}

const loadingTextArr = [
    'SAVING.',
    'SAVING..',
    'SAVING...'
]

export default function QuillEditorDialog(props: QuillTextEditorProps) {
    const { pageData, revisionData, openDialog, setOpenDialogCallback } = props;
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    
    const [loadingText, setLoadingText] = useState(loadingTextArr[0]);
    const [textInterval, setTextInterval] = useState<NodeJS.Timeout | null>(null);
    const [isSaving, setSaving] = useState(false);

    const router = useRouter();

    useEffect(() => {
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
        
        // handle category change
        const clientRequestCategory = {
            title: title,
            category: category
        }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientRequestCategory)
        }

        const categoryResponse = await fetch(`/api/page/slug/${pageData.slug}`, options);
        const categoryData = await categoryResponse.json();
        const newPageData: PageData = categoryData.payload;

        if (!categoryData.success) {
            window.alert("ERROR Setting Category.");
        }

        // process create revision created by user
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

        const revisionResponse: Response = await fetch(`/api/revision/page/${newPageData.slug}`, revisionOptions);
        const revisionData = await revisionResponse.json();

        if (!revisionResponse.ok) {
            console.error("ERROR CREATING REVISION.");  // TODO handle with toast?
        }

        console.log('sending validation...');
        await fetch(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}&path=/p/${pageData.slug}`);
        console.log('received validation!');

        await router.push({
            pathname: `/p/${newPageData.slug}`
        });

        console.log('routing!');
        setSaving(false);
        setOpenDialogCallback(false);
    }

    return (
        <>
            <Dialog fullWidth={true} maxWidth={'lg'} open={openDialog} onClose={setOpenDialogCallback}>
                <Container sx={{
                    marginTop: "1em"
                }}>
                    <CategorySelector
                        pageData={pageData}
                        categoryCallback={setCategory}
                        titleCallback={setTitle}
                    />
                    <QuillTextEditor
                    setContentCallback={setContent}
                    pageData={pageData}
                    revisionData={revisionData}
                    />
                </Container>
                
                    <Button 
                        variant="contained"
                        onClick={handleSave}
                    >
                        {
                            isSaving
                                ? loadingText
                                : 'SAVE'
                        }
                    </Button>
                    <Button onClick={() => setOpenDialogCallback(false)}>
                        CLOSE
                    </Button>
            </Dialog>
        </>
    );
}
function CategorySelector(props: { categoryCallback: Function, titleCallback: Function, pageData: PageData | undefined }) {
    const { categoryCallback, titleCallback, pageData } = props

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        fetch('/api/category?sort_type=alphabetical')
            .then(res => res.json())
            .then(data => setCategories([...data.payload, { name: "Uncategorized", id: 'uncategorized', description: "Uncategorized" }]))
    }, []);

    const handleCategoryChange = (event: any) => {
        categoryCallback(event.target.value);
    }

    const handleTitleChange = (event: any) => {
        titleCallback(event.target.value)
    }

    return (
        <>
            <FormControl fullWidth>
                <TextField label="Change Page Title" defaultValue={pageData?.title} onChange={handleTitleChange} sx={{
                    marginBottom: "1em"
                }}></TextField>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="category_label">Change Category</InputLabel>
                <Select
                    labelId="category_label"
                    id="category_select"
                    label="Select a Category"
                    defaultValue={pageData ? pageData.category : 'Uncategorized'}
                    onChange={handleCategoryChange}
                    sx={{ marginBottom: "1em" }}
                >
                    {categories.map((category: Category) => (
                        <MenuItem value={category.id}>{category.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}