import { useEffect, useState } from "react";
import { Page as PageData, Revision as RevisionData } from '@/isaac/models';
import { Box, Button } from "@mui/material";
import Page, { PageRequest } from "@/isaac/models/Page";
import { useRouter } from "next/router";
import Quill from 'quill';

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

    // Create and Initialize Quill Editor
    // var QuillHTML = `
    //     <!-- Include stylesheet -->
    //     <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    //     <link rel="stylesheet" href="//cdn.quilljs.com/1.3.6/quill.bubble.css">

    //     <!-- Create the editor container -->
    //     <div id="editor">
    //     </div>
    // `;
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
    ];
    var options = {
    // debug: 'info',
    placeholder: 'Compose an epic...',
    readOnly: false,
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions
    }
    };
    var quill = new Quill('#editor', options);

    quill.root.innerHTML = revisionData?.content as string;

    // Handle Saved Content
    const handleSave = async () => {
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
                    content: quill.root.innerHTML,
                    rev_page_id: pagePayload.id
                }

                redirectTitle = title;
            } else {
                request = {
                    content: quill.root.innerHTML,
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

    if (loading) return <h1>{loadingText}</h1>

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
            <Box id="editor" sx={{
                border: '1px solid black'
            }}>
                {/* Insert Quill Editor */}
            </Box>
            <Button onClick={handleSave}>
                {
                    loading
                        ? loadingText
                        : 'Save Changes'
                }
            </Button>
            <p>
                <em>
                    This editor uses Markdown. For a guide on how to use Markdown, click <a href="https://www.markdownguide.org/cheat-sheet/">here</a>.
                </em>
            </p>
        </>
    )
}
