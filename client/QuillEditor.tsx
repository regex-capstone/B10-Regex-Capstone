import { Page as PageData, Revision as RevisionData } from '@/isaac/models';
import { Box, Button, Container, Dialog, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { Category } from "@/isaac/models"
import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { valid } from 'node-html-parser';

interface QuillTextEditorProps {
    setContentCallback: (content: string) => void;
    setCategoryCallback: (content: string) => void;
    pageData?: PageData;
    revisionData?: RevisionData;
    title?: string;
    categoryId?: string;
}

export default function QuillTextEditor(props: QuillTextEditorProps) {
    const { setContentCallback, setCategoryCallback, pageData, revisionData } = props;

    const CreateQuillEditor = (content: string) => {
        const [openDialog, setOpenDialog] = useState<boolean>(false);
        const [htmlOverride, setHTMLOverride] = useState<string>();

        let modules = {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['link'],
                ['clean']
            ]
            // toolbar: false
        };

        let formats = [
            'header',
            'bold', 'italic', 'underline', 'strike',
            'blockquote', 'code-block',
            'list', 'bullet',
            'indent',
            'color', 'background',
            'font',
            'align',
            'link'
        ];

        let placeholder = 'Create a new page...';

        const { quill, quillRef } = useQuill({ modules, formats, placeholder });

        useEffect(() => {
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(content);
                quill.on('text-change', (delta, oldDelta, source) => {
                    setContentCallback(quill.root.innerHTML); // Get innerHTML using quill
                });
            }
        }, [quill])

        useEffect(() => {
            if (htmlOverride && quill) {
                quill.clipboard.dangerouslyPasteHTML(htmlOverride as string);
                setHTMLOverride(undefined);
            }
        }, [htmlOverride])

        useEffect(() => {
            
        })

        return (
            <>
                <Dialog 
                    fullWidth={true} 
                    maxWidth={'lg'} 
                    open={openDialog} 
                    onClose={setOpenDialog}
                >
                    <HTMLToEditorDialog
                        initHTML={quill?.root.innerHTML}
                        setHTMLOverride={setHTMLOverride}
                        setOpenDialog={setOpenDialog}
                    />
                </Dialog>
                <Container ref={quillRef} />
                <Button
                    style={{ width: '100%' }}
                    onClick={() => setOpenDialog(prev => !prev)}
                >
                    Open HTML Editor
                </Button>
                <CategorySelector
                    pageData={pageData}
                    callback={setCategoryCallback}
                />
            </>
        );
    }

    return (
        <>
            <header className="text-header">
                {
                    (pageData)
                        ? <p style={{
                            marginLeft: '1em'
                        }}>Editing {pageData.title}...</p>
                        : <p>Create a new page...</p>
                }
            </header>
            <Box id="editor">
                {CreateQuillEditor(revisionData ? revisionData.content : '')}
            </Box>
        </>
    )
}

function HTMLToEditorDialog(props: any) {
    const { initHTML, setHTMLOverride, setOpenDialog } = props;

    const [html, setHTML] = useState<string>(initHTML);

    const handleSave = () => {
        setHTMLOverride(html);
        setOpenDialog(false);
    }

    return (
        <>
            <Grid
                container
                direction="column"
                style={{
                    padding: '20px'
                }}
            >
                <Grid item>
                    <TextField
                        id="outlined-multiline-static"
                        label="HTML"
                        multiline
                        rows={4}
                        defaultValue={initHTML}
                        onChange={(e) => setHTML(e.target.value)}
                        style={{ 
                            width: '100%',
                            padding: '10px'
                        }} 
                    />     
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        onClick={() => setOpenDialog((prev: boolean) => !prev)}
                        style={{ margin: '10px' }}
                    >
                        CLOSE
                    </Button>  
                    <Button
                        variant="contained"
                        onClick={() => handleSave()}
                        style={{ margin: '10px' }}
                    >
                        SAVE
                    </Button>           
                </Grid>
            </Grid>
        </>
    )
}

function CategorySelector(props: { callback: Function, pageData: PageData | undefined }) {
    const { callback, pageData } = props

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        fetch('/api/category?sort_type=alphabetical')
            .then(res => res.json())
            .then(data => setCategories([...data.payload, { name: "Uncategorized", id: null, description: "Uncategorized" }]))
    }, []);

    const handleChange = (event: any) => {
        callback(event.target.value);
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="category_label">Change Category</InputLabel>
            <Select
                labelId="dcategory_label"
                id="category_select"
                label="Select a Category"
                defaultValue={pageData ? pageData.category : 'Uncategorized'}
                onChange={handleChange}
            >
                {categories.map((category: Category) => (
                    <MenuItem value={category.id}>{category.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}