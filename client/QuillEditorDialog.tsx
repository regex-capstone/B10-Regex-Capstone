import QuillTextEditor from "@/client/QuillEditor";
import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material";
import React from 'react';
import { UserRole } from "@/isaac/models/User";
import { Page as PageData, Revision as RevisionData } from '@/isaac/models';


interface DialogProps {
    open: boolean;
    onClose: () => void;
    pageData: PageData;
    revisionData: RevisionData;
}

interface QuillTextEditorProps {
    pageData: PageData;
    revisionData: RevisionData;
}


function QuillDialog(props: DialogProps) {
    const { onClose, open, revisionData, pageData } = props;

    const handleClose = () => {
        onClose();
    };

    return <>
        <Dialog fullWidth={true} maxWidth={'xl'} open={open} onClose={handleClose}>
            <QuillTextEditor 
                pageData={pageData}
                revisionData={revisionData}
            />
        </Dialog>
    </>
}

export default function QuillEditorDialog(props: QuillTextEditorProps) {
    const { pageData, revisionData } = props;

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
            revisionData={revisionData}
            pageData={pageData}
        />
    </>
}

// ADMIN only
QuillEditorDialog.auth = {
    role: UserRole.ADMIN
}