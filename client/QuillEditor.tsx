import { Page as PageData, Revision as RevisionData } from '@/isaac/models';
import { Box, Button, Container } from "@mui/material";
import Page, { PageRequest } from "@/isaac/models/Page";
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css';

interface QuillTextEditorProps {
    pageData?: PageData;
    revisionData?: RevisionData;
    title?: string;
    categoryId?: string;
}

const loadingTextArr = [
    'Saving.',
    'Saving..',
    'Saving...'
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
            let redirect = false;

            if (!pageData) {
                // console.log("!pageData");
                redirect = true;
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
                // console.log("pageData");
                // console.log("content: " + Editor?.innerHTML);
                // console.log("page id: " + pageData.id as string);
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
            // Log the options
            console.log("options: " + options.body);
            const pageId = pageData?.id || pagePayload.id;
            await fetch(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}&path=/p/${redirectTitle}-${pageId}`);

            if (redirect) {
                router.push(`/p/${title}-${pageId}`);   // TODO: handle page slug change
            }
        } catch (err) {
            console.error(err); // @TODO: handle toast notifications
        }
    }

    const CreateQuillEditor = (content: string) => {
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

        let placeholder = 'Create a new page...';

        const [value, setValue] = useState(content);

        const { quill, quillRef } = useQuill({modules, formats, placeholder});

        React.useEffect(() => {
            if (quill) {
              quill.clipboard.dangerouslyPasteHTML(content);
              quill.on('text-change', () => {
                setValue;
                console.log('Text change!');
                console.log(quill.root.innerHTML); // Get innerHTML using quill
              });
            }
        }, [quill]);
      
        return <>
            {/* <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} /> */}
            <Container ref={quillRef} />
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
                        ? <p style={{
                            marginLeft: '1em'
                        }}>Editing {pageData.title}...</p>
                        : <p>Create a new page...</p>
                }
            </header>
            <Box id="editor">
                {CreateQuillEditor(revisionData?.content as string)}
            </Box>
        </>
    )
}
