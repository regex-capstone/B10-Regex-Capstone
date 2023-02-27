import { useEffect, useState } from "react";
import { Page as PageData, Revision as RevisionData } from '@/isaac/models';
import { ContentState, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import { RevisionRequest } from "@/isaac/models/Revision";
import { Box, Button } from "@mui/material";
// @ts-ignore
import { stateToMarkdown } from 'draft-js-export-markdown';
import { useRouter } from "next/router";

/**
 * This library does not allow for server-side rendering... To accommodate for SSR, let's consider another library.
 */
const Editor = dynamic<EditorProps>(
    // @ts-ignore
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

interface RichTextEditorProps {
    pageData: PageData;
    revisionData: RevisionData;
}

const loadingTextArr = [
    'Redirecting you back to the page.',
    'Redirecting you back to the page..',
    'Redirecting you back to the page...'
]

export default function RichTextEditor(props: RichTextEditorProps) {
    const { pageData, revisionData } = props;
    const [loadingText, setLoadingText] = useState(loadingTextArr[0]);
    const [loading, setLoading] = useState(false);
    const [editorState, setEditorState] = useState(
        revisionData.content
            ? EditorState.createWithContent(ContentState.createFromText(revisionData.content))
            : EditorState.createEmpty()
    );
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
        setLoading(true);

        let textIndex = 0;

        setTextInterval(setInterval(() => {
            setLoadingText(loadingTextArr[textIndex % 3]);
            textIndex++;
        }, 200));

        const request: RevisionRequest = {
            content: getMarkdown(editorState),
            rev_page_id: pageData.id as string
        }

        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSON.stringify(request),
        }

        const response = await fetch('/api/revision', options);
        const data = await response.json();
        // redirect to the page we just edited
        router.push(`/page/${pageData.title}`);
    }

    return (
        <>
            {
                loading
                    ? <h1>{loadingText}</h1>
                    : <>
                        <header className="text-header">
                            Editing "{pageData.title}"...
                        </header>
                        <Box sx={{
                            border: '1px solid black'
                        }}>
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                                toolbar={{
                                    options: ['inline', 'blockType', 'list', 'link', 'emoji', 'history'],
                                    inline: {
                                        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
                                    },
                                    list: {
                                        options: ['unordered, ordered']
                                    },
                                    link: {
                                        options: ['link']
                                    }
                                }}
                            />
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
            }
        </>
    )
}

function getMarkdown(rawData: any) {
    return stateToMarkdown(
        rawData.getCurrentContent()
    )
}