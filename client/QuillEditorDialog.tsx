import QuillTextEditor from "@/client/QuillEditor";
import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material";
import React, { useState } from 'react';
import { Page as PageData, Revision as RevisionData } from '@/isaac/models';
import { useRouter } from "next/router";

interface QuillTextEditorProps {
    pageData: PageData;
    revisionData: RevisionData;
}

const loadingTextArr = [
    'SAVING.',
    'SAVING..',
    'SAVING...'
]

export default function QuillEditorDialog(props: QuillTextEditorProps) {
    const { pageData, revisionData } = props;
    const [content, setContent] = useState<string>('');
    const [open, setOpen] = useState(false);

    const [loadingText, setLoadingText] = useState(loadingTextArr[0]);
    const [textInterval, setTextInterval] = useState<NodeJS.Timeout | null>(null);
    const [isSaving, setSaving] = useState(false);

    const router = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        // handle loading text
        setSaving(true);

        let textIndex = 0;

        setTextInterval(setInterval(() => {
            setLoadingText(loadingTextArr[textIndex % 3]);
            textIndex++;
        }, 200));

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

        const revisionResponse = await fetch(`/api/revision/page/${pageData.slug}`, revisionOptions);
        const revisionData = await revisionResponse.json();

        if (!revisionData.success) {
            console.error("ERROR CREATING REVISION.");  // TODO handle with toast?
        }

        await router.push({
            pathname: '/redirect',
            query: { path: `p/${pageData.slug}`}
        });

        setSaving(false);
    }

    return (
        <>
            <Button onClick={handleClickOpen}>
                Open Editor
            </Button>
            <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={handleClose}>
                <QuillTextEditor
                    setContentCallback={setContent}
                    pageData={pageData}
                    revisionData={revisionData}
                />
                <Button onClick={handleSave}>
                    {
                        isSaving
                            ? loadingText
                            : 'SAVE'
                    }
                </Button>
            </Dialog>
        </>
    );
}