import Header from "@/client/Header"
import useCategory from "@/hooks/useCategory"
import { Category } from "@/isaac/models"
import { Box, Container } from "@mui/material"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AllTopics() {
  const [categories, setCategories] = useState<Category[]>([])
  const { data: categoryData } = useCategory();

  useEffect(() => {
    if (categoryData) {
        setCategories(categoryData.payload)
    }
  }, [categoryData])

  return (
    <>
      <Head>
        <title>{`Topics | ISAAC`}</title>
      </Head>
      <Header />
      <Container maxWidth="md">
        <h1>Topics</h1>
        <hr />
        {categories.map((category: Category) => (
          <Box key={category.id}>
            <Link href={`/t/${category.name}`}>{category.name}</Link>
          </Box>
        ))}
      </Container>
    </>
  )
}