import QuillTextEditor from "@/client/QuillEditor";
import Dialog from '@mui/material/Dialog';
import { Button, Stack } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { Page as PageData, Revision as RevisionData } from '@/isaac/models';
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
    const [content, setContent] = useState<string>('');

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
            <Dialog fullWidth={true} maxWidth={'lg'} open={openDialog} onClose={setOpenDialogCallback}>
                <QuillTextEditor
                    setContentCallback={setContent}
                    pageData={pageData}
                    revisionData={revisionData}
                />
                    {/* {// TODO Alan - CAN YOU MAKE THIS SIDE BY SIDE FOR ME PLZ THANKS} */}
                    <Button onClick={handleSave}>
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