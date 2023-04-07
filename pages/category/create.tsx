import Grid2 from '@mui/material/Unstable_Grid2'
import Logo from "@/client/Logo";
import Head from "next/head";
import { Container, TextField, Stack, Button } from "@mui/material";
import SearchBar from '@/client/SearchBar';
import Header from "@/client/Header";
import { UserRole } from '@/isaac/models/User';

export default function createCategory() {
    return <>
        <Head>
            <title>{`Create New Category | ISAAC`}</title>
        </Head>
        <Header />
        <Container>
            <Grid2 container spacing={2}>
                <Grid2 xs={3}>
                    <Stack direction={'column'} spacing={2}>
                        <Logo />
                    </Stack>
                </Grid2>
                <Grid2 xs={6}>
                    <Stack direction={'column'} spacing={2}>
                        <SearchBar />
                    </Stack>
                </Grid2>
                <Grid2 xs={3}>
                    <Stack direction={'column'} spacing={2}>
                        
                    </Stack>
                </Grid2>
            </Grid2>
            <Grid2 xs={6}>
                <TextField fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                    label="What is the category title?"
                    sx={{
                        flexGrow: 1,
                        marginTop: 10
                    }}
                />
            </Grid2>
            {/* <Grid2 container spacing={2}>
                <Grid2 xs={6}>
                    <h1>Find pages to add to new category</h1>
                    <SearchBar />
                    <Stack direction={'column'} spacing={2}>
                    </Stack>
                    <Button onClick={handleSave}>Save Changes</Button>
                </Grid2>
                <Grid2 xs={6}>
                    <h1>Category page list</h1>
                    <Stack direction={"column"} spacing={2}>
                    </Stack>
                </Grid2>
            </Grid2> */}
            <Grid2 xs={6}>
                <Button onClick={handleSave}>Save Changes</Button>
            </Grid2>
        </Container>
    </>
}

createCategory.auth = {
    role: UserRole.ADMIN
}

let categoryName = ""

// This is a placeholder for the setTitle function in props
function setTitle(value: string) {
    categoryName = value
}

// This is a placeholder function
async function handleSave() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: categoryName
        }),
    }
    
    await fetch('/api/category', options);
}