import ApiEndpoint from "@/isaac/api/APIEndpoint";
import API from "@/isaac/api/APIInterface";
import { Category } from "@/isaac/models";
import { Box, Button, Card, CardContent, Container, Divider, Stack } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'
import { GetStaticPropsResult } from "next";
import SearchBar from "@/client/SearchBar";
import Logo from "@/client/Logo";
import Link from "next/link";
import Header from "@/client/Header";
import Theme from "@/client/Theme";
import Head from "next/head";
import { useSession } from "next-auth/react";
import MongooseDatabase from "@/isaac/database/mongoose/MongooseDatabase";

const api: API = ApiEndpoint

export async function getStaticProps(): Promise<GetStaticPropsResult<IndexProps>> {
    const categories: Category[] = await api.getAllCategories()
    const trendingPageClicksResponse = await MongooseDatabase.aggMetrics(
        {
            _id: '$met_page_id', count: { $sum: 1 }
        },
        {
            count: -1
        },
        {
            from: 'pages',
            localField: '_id',
            foreignField: '_id',
            as: 'page'
        }
    );
    const trendingPayload = trendingPageClicksResponse.payload;

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
        <>
            <Head>
                <title>ISAAC</title>
            </Head>
            <Header />
            <AdminTools />
            <Container sx={{
                paddingTop: '2rem',
            }}>
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
                        <Box sx={{
                            textAlign: 'center',
                            letterSpacing: '0.15rem',
                        }}>
                            <p>Informatics Student Advising Automation Cyclopedia</p>
                        </Box>
                        <Box sx={{
                            minWidth: "60%",
                            width: "40rem",
                            maxWidth: "100%"
                        }}>
                            <SearchBar />
                        </Box>
                    </Stack>
                    <Divider />
                    <Container>
                        <Grid2 container>
                            {categories.map((category, i) => (
                                <Grid2 key={i} xs={6}>
                                    <Link href={`/category/${category.name}`} style={{
                                        textDecoration: 'none',
                                        color: Theme.COLOR.TEXT_DARK,
                                    }}>
                                        <b>{category.name}</b>
                                    </Link>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Container>
                </Stack>
            </Container>
        </>
    )
}

function AdminTools() {
    const { data: session } = useSession();

    if (!session || !session.isAdmin) {  // not logged in or not admin user
        return (<></>)
    }

    return (
        <Card sx={{
            position: 'fixed',
            bottom: '10%',
            right: -5,
            paddingRight: 5,
        }}>
            <CardContent>
                <Stack spacing={2} direction="column">
                    <b>Admin Tools</b>
                    <Link href="/p/new" passHref style={{
                        textDecoration: 'none',
                    }}>
                        <Button variant="contained">Create Page</Button>
                    </Link>
                    <Link href="/#" passHref style={{
                        textDecoration: 'none',
                    }}>
                        <Button variant="contained">Analytics</Button>
                    </Link>
                    <Link href="/category/create" passHref style={{
                        textDecoration: 'none',
                    }}>
                        <Button variant="contained">Create Category</Button>
                    </Link>
                </Stack>
            </CardContent>
        </Card>
    )
}