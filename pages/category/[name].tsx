import { Category, Page } from "@/isaac/models"
import API from "@/isaac/api/APIInterface"
import APIEndpoint from "@/isaac/api/APIEndpoint"
import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next"
import SearchBar from "@/client/SearchBar"
import Head from "next/head"
import { Container, Stack } from "@mui/material";
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
  // const category: Category = await api.getCategoryByName(name as string)
  // const pages: Page[] = await api.getCategoryPages(category.id as string)
  const category = { name: "Example Category", id: "1", created_at: 12345 }
  const pages: any = []
  return {
    props: {
      category,
      pages
    },
    revalidate: 10,
  }
}

interface CategoryProps {
  category: Category
  pages: Page[]
}

export default function Directory(props: CategoryProps) {
  const { category, pages } = props
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
              {/* <ContentTable page={pageData} /> */}
            </Stack>
          </Grid2>
          <Grid2 xs={6}>
            <Stack direction={'column'} spacing={2}>
              <SearchBar initialQuery={query} />
              <Content name={category.name} pages={[]} />
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
    <div>
      <h1>{name}</h1>
      <hr />
      <ul>
        {pages.map((page: Page) => (
          <li key={page.id}>
            <Link href={`/page/${page.id}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}