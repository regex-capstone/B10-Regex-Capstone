import { Category, Page } from "@/isaac/models"
import { SortType } from "@/isaac/public/SortType"
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next"
import Head from "next/head"
import { Box, Container, IconButton, Stack } from "@mui/material";
import Link from "next/link"
import PublicAPIEndpoint from "@/isaac/public/PublicAPI"
import { GetCategoryTypes } from "@/isaac/public/api/Category"
import { GetPageTypes } from "@/isaac/public/api/Page"
import Header from "@/client/Header";
import { useSession } from "next-auth/react";
import { Delete } from "@mui/icons-material";
import Theme from "@/client/Theme";
import { useRouter } from "next/router";

export async function getStaticPaths(context: GetStaticPathsContext): Promise<GetStaticPathsResult> {
    const api = PublicAPIEndpoint;
    const categories: Category[] = (await api.Category.get(GetCategoryTypes.ALL_CATEGORIES, SortType.ALPHABETICAL) as Category[]);
    categories.push({ name: "Uncategorized", id: undefined, slug: "uncategorized", created_at: -1 })
    return {
        paths: categories.map((category: Category) => ({
            params: { name: category.name },
        })),
        fallback: false,
    }
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<CategoryProps>> {
    const api = PublicAPIEndpoint;
    const { name } = context.params ?? {};
    const category: Category = await api.Category.get(
        GetCategoryTypes.CATEGORY_BY_NAME,
        SortType.NONE,
        { c_name: name as string }
    ) as Category;
    const pages: Page[] = (await api.Page.get(
        GetPageTypes.PAGES_BY_CATEGORY_ID,
        SortType.ALPHABETICAL,
        { c_id: category ? category.id as string : null }
    )) as Page[];
    return {
        props: {
            category: JSON.stringify(category ?? { name: "Uncategorized", id: undefined, slug: "uncategorized", created_at: -1 }),
            pages: JSON.stringify(pages),
        },
        revalidate: 10,
    }
}

interface CategoryProps {
    category: string
    pages: string
}

export default function Directory(props: CategoryProps) {
    const category = JSON.parse(props.category) as Category
    const pages = JSON.parse(props.pages) as Page[]

    const { data: session } = useSession()
    const router = useRouter()

    const handleDelete = async () => {
        await fetch(`/api/category/c_id/${category.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        router.push('/t/all')
    }

    return (
        <>
            <Head>
                <title>{`${category.name} | ISAAC`}</title>
            </Head>
            <Header actions={
                session ?
                    <Stack direction='row'>
                        <IconButton>
                            <Delete htmlColor={Theme.COLOR.PRIMARY} onClick={() => handleDelete()} />
                        </IconButton>
                    </Stack>
                : undefined
            }
            />
            <Container maxWidth="md">
                <Content name={category.name} pages={pages} />
            </Container>
        </>
    )
}

function Content(props: { name: string, pages: Page[] }) {
    const { name, pages } = props
    return (
        <Stack direction="column" spacing={2}>
            <h1>{name}</h1>
            <hr />
            <i>{pages.length} page(s) in category</i>
            <Stack direction="column" spacing={1}>
                {pages.map((page: Page) => (
                    <Box key={page.id}>
                        <Link href={`/p/${page.slug}`}>{page.title}</Link>
                    </Box>
                ))}
            </Stack>
        </Stack>
    )
}