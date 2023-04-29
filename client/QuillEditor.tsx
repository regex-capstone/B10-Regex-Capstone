import { Page as PageData, Revision as RevisionData } from '@/isaac/models';
import { Box, Container } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import DOMPurify from 'isomorphic-dompurify';

interface QuillTextEditorProps {
    setContentCallback: (content: string) => void;
    pageData?: PageData;
    revisionData?: RevisionData;
    title?: string;
    categoryId?: string;
}

export default function QuillTextEditor(props: QuillTextEditorProps) {
    const setContentCallback = props.setContentCallback;
    const { pageData, revisionData } = props;

    const router = useRouter();

    const CreateQuillEditor = (content: string) => {
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

        const { quill, quillRef } = useQuill({ modules, formats, placeholder });

        useEffect(() => {
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(DOMPurify.sanitize(content));
            }
        });

        useEffect(() => {
            if (quill) {
                quill.on('text-change', (delta, oldDelta, source) => {
                    setContentCallback(quill.root.innerHTML); // Get innerHTML using quill
                });
            }
        })

        return (
            <>
                <Container ref={quillRef} />
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
