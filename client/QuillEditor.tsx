import { Page as PageData, Revision as RevisionData } from '@/isaac/models';
import { Box, Button } from "@mui/material";
import Page, { PageRequest } from "@/isaac/models/Page";
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillTextEditorProps {
    pageData?: PageData;
    revisionData?: RevisionData;
    title?: string;
    categoryId?: string;
}

const loadingTextArr = [
    'Redirecting you.',
    'Redirecting you..',
    'Redirecting you...'
]

export default function QuillTextEditor(props: QuillTextEditorProps) {
    const { pageData, revisionData, categoryId, title } = props;
    const [loadingText, setLoadingText] = useState(loadingTextArr[0]);
    const [loading, setLoading] = useState(false);

    const [textInterval, setTextInterval] = useState<NodeJS.Timeout | null>(null);

    const router = useRouter();

    useEffect(() => {
        return () => {
            if (textInterval) {
                clearInterval(textInterval);
            }
        }
    }, [])
    
    // var toolbarOptions = [
    //     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //     ['blockquote', 'code-block'],
      
    //     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    //     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    //     [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    //     [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    //     [{ 'direction': 'rtl' }],                         // text direction
      
    //     [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
    //     [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    //     [{ 'font': [] }],
    //     [{ 'align': [] }],
      
    //     ['clean']                                         // remove formatting button
    // ];
    // var options = {
    //     // debug: 'info',
    //     placeholder: 'Compose an epic...',
    //     readOnly: false,
    //     theme: 'snow',
    //     modules: {
    //     toolbar: toolbarOptions
    //     }
    // };

    // @TODO: Handle Saved Content
    // const handleSave = async () => {
    //     let Editor = document.getElementsByClassName('ql-editor')[0];
    //     console.log(Editor?.innerHTML);
    // }
    const handleSave = async () => {
        let Editor = document.getElementsByClassName('ql-editor')[0];
        setLoading(true);

        let textIndex = 0;

        setTextInterval(setInterval(() => {
            setLoadingText(loadingTextArr[textIndex % 3]);
            textIndex++;
        }, 200));

        try {
            let request;
            let redirectTitle;
            let pagePayload: any = {};

            if (!pageData) {
                const pageRequest: PageRequest = {
                    title: title as string,
                    page_category_id: categoryId as string
                }

                const pageOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pageRequest),
                }

                const fetchPage = (await fetch('/api/page', pageOptions));
                pagePayload = (await fetchPage.json()).page;

                request = {
                    content: Editor?.innerHTML,
                    rev_page_id: pagePayload.id
                }

                redirectTitle = title;
            } else {
                request = {
                    content: Editor?.innerHTML,
                    rev_page_id: pageData.id as string
                }

                redirectTitle = pageData.title;
            }

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }

            await fetch('/api/revision', options);
            const pageId = (pagePayload) ? pagePayload.id : pageData?.id;

            await fetch(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}&path=/p/${redirectTitle}-${pageId}`);
            router.push(`/p/${title}-${pageId}`);   // TODO: handle page slug change
        } catch (err) {
            console.error(err); // @TODO: handle toast notifications
        }
    }

    const CreateQuillEditor = (content: string) => {
        const [value, setValue] = useState(content);

        let modules = {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline','strike'],
                ['blockquote', 'code-block'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'indent': '-1'}, {'indent': '+1'}],
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
                ['link'],
                ['clean']
            ],
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
      
        return <>
            <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
            <Button onClick={handleSave}>
                {
                    loading
                        ? loadingText
                        : 'Save Changes'
                }
            </Button>
        </>;
    }

    // if (loading) return <h1>{loadingText}</h1>

    return (
        <>
            <header className="text-header">
                {
                    (pageData)
                        ? <p>Editing {pageData.title}...</p>
                        : <p>Create a new page...</p>
                }
                <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
            </header>
            <Box id="editor">
                {CreateQuillEditor(revisionData?.content as string)}
            </Box>
        </>
    )
}
