import Header from "@/client/Header"
import Theme from "@/client/Theme"
import { Category } from "@/isaac/models"
import { LibraryAdd } from "@mui/icons-material"
import { Box, Button, Container, Dialog, DialogTitle, IconButton, Stack, TextField } from "@mui/material"
import { useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function AllTopics() {
    const [categories, setCategories] = useState<Category[]>([])
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [newCategoryName, setNewCategoryName] = useState<string>('')

    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        fetch('/api/category?sort_type=alphabetical')
            .then(res => res.json())
            .then(data => setCategories([...data.payload, { name: "Uncategorized", id: null, description: "Uncategorized" }]))
    }, []);

    const handleCreateCategory = async (name: string) => {
        await fetch('/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name
            }),
        })
        router.reload()
    }

    return (
        <>
            <Head>
                <title>{`Topics | ISAAC`}</title>
            </Head>
            <Header actions={
                session ?
                    <Stack direction='row' spacing='2'>
                        <IconButton onClick={() => { setDialogOpen(true) }}>
                            <LibraryAdd htmlColor={Theme.COLOR.PRIMARY} />
                        </IconButton>
                    </Stack>
                    :
                    undefined
            } />
            <Dialog open={dialogOpen}>
                <DialogTitle>Add New Topic</DialogTitle>
                <Box sx={{
                    padding: "10px"
                }}>
                    <Stack direction='column' spacing={2}>
                        <TextField value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
                        <Stack direction='row'>
                            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                            <Button variant='contained' onClick={() => handleCreateCategory(newCategoryName)}>Add</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Dialog>
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