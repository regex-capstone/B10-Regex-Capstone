import { Category, Page } from "@/isaac/models"
import API from "@/isaac/api/APIInterface"
import APIEndpoint from "@/isaac/api/APIEndpoint"
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next"
import SearchBar from "@/client/SearchBar"
import Head from "next/head"
import { Box, Container, Stack } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import Link from "next/link"

export async function getStaticPaths(context: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const api: API = APIEndpoint
  const categories: Category[] = await api.getAllCategories()
  return {
    paths: categories.map((category: Category) => ({
      params: { name: category.name },
    })),
    fallback: false,
  }
}

export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<CategoryProps>> {
  const api: API = APIEndpoint
  const { name } = context.params ?? {};
  const category: Category = await api.getCategoryByName(name as string)
  const pages: Page[] = await api.getPagesByCategoryId(category.id as string)
  return {
    props: {
      category: JSON.stringify(category),
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
  const query = ""

  return (
    <>
      <Head>
        <title>{`${category.name} | ISAAC`}</title>
      </Head>
      <Container>
        <Grid2 container spacing={2}>
          <Grid2 xs={3}>
            <Stack direction={'column'} spacing={2}>
              <h1>ISAAC</h1>
            </Stack>
          </Grid2>
          <Grid2 xs={6}>
            <Stack direction={'column'} spacing={2}>
              <SearchBar initialQuery={query} />
              <Content name={category.name} pages={pages} />
            </Stack>
          </Grid2>
        </Grid2>
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
            <Link href={`/page/${page.title}`}>{page.title}</Link>
          </Box>
        ))}
      </Stack>
    </Stack>
  )
}