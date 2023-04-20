import { useEffect, useState } from "react";
import { Page as PageData, Revision as RevisionData } from '@/isaac/models';
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import { Box, Button } from "@mui/material";
// @ts-ignore
import { stateToMarkdown } from 'draft-js-export-markdown';
// @ts-ignore
import { stateFromMarkdown } from 'draft-js-import-markdown';
import { useRouter } from "next/router";
import Page, { ClientPageRequest } from "@/isaac/models/Page";
import { ContentState, EditorState } from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

/**
 * This library does not allow for server-side rendering... To accommodate for SSR, let's consider another library.
 */
const Editor = dynamic<EditorProps>(
    // @ts-ignore
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)

interface RichTextEditorProps {
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

export default function RichTextEditor(props: RichTextEditorProps) {
    const { pageData, revisionData, categoryId, title } = props;
    const [loadingText, setLoadingText] = useState(loadingTextArr[0]);
    const [loading, setLoading] = useState(false);
    const [editorState, setEditorState] = useState(initializeEditorState(revisionData?.content as string));

    const [textInterval, setTextInterval] = useState<NodeJS.Timeout | null>(null);

    const router = useRouter();

    useEffect(() => {
        return () => {
            if (textInterval) {
                clearInterval(textInterval);
            }
        }
    }, [])

    useEffect(() => {
        setEditorState(initializeEditorState(revisionData?.content as string));
    }, [revisionData])


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
            let pagePayload: Page;

            if (!pageData) {
                const pageRequest: ClientPageRequest = {
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
                    content: getMarkdown(editorState),
                    rev_page_id: pagePayload.id
                }

                redirectTitle = title;
            } else {
                request = {
                    content: getMarkdown(editorState),
                    rev_page_id: pageData.id as string
                }

                redirectTitle = pageData.title;
                pagePayload = pageData;
            }

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            }

            await fetch('/api/revision', options);
            const pageId = pagePayload.id;

            await fetch(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}&path=/p/${redirectTitle}-${pageId}`);
            router.push(`/p/${pagePayload.slug}`);   // TODO: handle page slug change
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
    )
}

function getMarkdown(rawData: any) {
    return stateToMarkdown(
        rawData.getCurrentContent()
    )
}

function initializeEditorState(content: string) {
    const contentState = stateFromMarkdown(content ?? "");
    return content
        ? EditorState.createWithContent(contentState)
        : EditorState.createEmpty()
}