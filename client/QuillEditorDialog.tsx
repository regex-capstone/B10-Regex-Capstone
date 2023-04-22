import QuillTextEditor from "@/client/QuillEditor";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material";
import React, { useState, useEffect } from 'react';

import { useRouter } from "next/router";
import usePage from "@/client/hooks/usePage";
import useRevision from "@/client/hooks/useRevision";
import { UserRole } from "@/isaac/models/User";

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
}

function QuillDialog(props: SimpleDialogProps) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const router = useRouter();
    const { page: title } = router.query;

    const { data: pageData } = usePage(title as string);
    const { data: revisionData } = useRevision(title as string);

    return <>
        <Dialog fullWidth={true} maxWidth={'xl'} open={open} onClose={handleClose}>
            <QuillTextEditor 
                pageData={pageData}
                revisionData={revisionData}
            />
        </Dialog>
    </>
}

export default function QuillEditorDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return <>
        <Button onClick={handleClickOpen}>
            Open Editor
        </Button>
        <QuillDialog 
            open={open}
            onClose={handleClose}
        />
    </>
}

// ADMIN only
QuillEditorDialog.auth = {
    role: UserRole.ADMIN
}