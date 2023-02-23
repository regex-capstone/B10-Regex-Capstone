import ApiEndpoint from "@/isaac/api/APIEndpoint";
import API from "@/isaac/api/APIInterface";
import { Category } from "@/isaac/models";
import { Box, Button, Container, Divider, Stack, TextField, Typography } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import { GetStaticPropsResult } from "next";
import SearchBar from "@/client/SearchBar";
import Logo from "@/client/Logo";
import Link from "next/link";

const api: API = ApiEndpoint

export async function getStaticProps(): Promise<GetStaticPropsResult<IndexProps>> {
  const categories: Category[] = await api.getAllCategories()

  return {
    props: {
      // NextJS requires props to be serializable
      categories: JSON.stringify(categories)
    },
    revalidate: 60,
  }
}

interface IndexProps {
  categories: string
}

/* (root)/ */
export default function Index(props: IndexProps) {
  const categories: Category[] = JSON.parse(props.categories) as Category[]

  return (
    <Container>
      <Stack spacing={2} direction="column">
        <Stack
          spacing={2}
          direction="column"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Logo />
          <p>Informatics Student Advising Automation Complex</p>
          <Box sx={{
            flexGrow: 1,
          }}>
            <SearchBar />
          </Box>
        </Stack>
        <Divider />
        <Container>
          <Grid2 container>
            {categories.map((category, i) => (
              <Grid2 key={i} xs={6}>
                <Link href={`/category/${category.name}`}>{category.name}</Link> 
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Stack>
    </Container>
  )
}