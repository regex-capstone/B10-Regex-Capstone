import { Autocomplete, Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/client/Header";
import { Page } from "@/isaac/models";
import Link from "next/link";


export default function Index() {
    return (
        <>
            <Head>
                <title>ISAAC</title>
            </Head>
            <Header disableSearchBar />
            <Background />
            <SearchModule />
            <PageBody />
        </>
    )
}

function Background() {
    return (
        <Box sx={{
            position: "relative",
            zIndex: -1,
            height: "50vh",
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mary_Gates_Hall%2C_April_2008.jpg/1280px-Mary_Gates_Hall%2C_April_2008.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "blur(2px)",
        }} />
    )
}

function SearchModule() {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const onSearch = (query: string) => {
        router.push(`/search?q=${query}`);
    }
    return (
        <Box sx={{
            width: "100%",
            zIndex: 0,
            position: "absolute",
            top: 0,
            left: 0,
            marginTop: "15vh",
        }}>
            <Container maxWidth="md">
                <Stack spacing={2} direction="column" alignItems="center">
                    <Typography
                        fontFamily="sans-serif"
                        fontWeight="700"
                        fontSize="32px"
                        color="#FFF"
                        letterSpacing="0.75em"
                        sx={{
                            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                        }}
                    >
                        ISAAC
                    </Typography>
                    <Box sx={{
                        minWidth: "60%",
                    }}>
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={["Suggestion 1", "Suggestion 2", "Suggestion 3"]}
                            renderInput={(params) => <TextField
                                {...params}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        onSearch(value)
                                        e.preventDefault()
                                    }
                                }}
                                variant="standard"
                                InputProps={{
                                    disableUnderline: true,
                                    endAdornment: <SearchIcon />,
                                }}
                                sx={{
                                    paddingLeft: "1em",
                                    paddingRight: "1em",
                                    paddingTop: "0.5em",
                                    paddingBottom: "0.5em",
                                    backgroundColor: "#FFF",
                                    borderRadius: 30,
                                    border: "none",
                                }} />}
                        />
                    </Box >
                    <Stack spacing={1} direction="row">
                        <Button color="primary" variant="contained" onClick={(e) => onSearch(value)}>
                            Search
                        </Button>
                        <Button color="secondary" variant="contained" onClick={(e) => router.push("/t/all")}>
                            Browse Topics
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}

function PageBody() {
    return (
        <Box sx={{
            height: "100%",
            backgroundColor: "#FFF",
            padding: 2,
            margin: 0,
            position: "relative",
            zIndex: 1,
        }}>
            <Container maxWidth="md">
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: -5,
                }}>
                    <TrendingCard />
                    <RecentCard />
                </Box>
            </Container>
        </Box>
    )
}

function Card(props: any) {
    return (
        <Box sx={{
            // outline: "1px solid red",
            backgroundColor: "#FFF",
            boxShadow: 5,
            padding: 2,
            margin: 1,
            borderRadius: 5,
            flex: 1,
            minWidth: "200px",
        }}>
            {props.children}
        </Box>
    )
}

function TrendingCard() {
    const [pages, setPages] = useState<Page[]>();

    useEffect(() => {
        fetch("/api/page/trending")
            .then(res => res.json())
            .then(results => setPages(results.payload))
            .catch(err => console.log(err));
    }, [])

    return (
        <Card>
            <Box sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
            }}>
                <Typography fontFamily="Encode Sans" fontSize={24}><b>Trending</b></Typography>
            </Box>
            <Stack direction="column">
                {pages ? pages.map(p => <Link href={`/p/${p.slug}/`} key={p.id}>{p.title}</Link>) : undefined}
            </Stack>
        </Card>
    )
}

function RecentCard() {
    const [pages, setPages] = useState<Page[]>();

    useEffect(() => {
        fetch("/api/page?sort_type=recently_created")
            .then(res => res.json())
            .then(results => setPages(results.payload))
            .catch(err => console.log(err));
    }, [])

    return (
        <Card>
            <Box sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
            }}>
                <Typography fontFamily="Encode Sans" fontSize={24}><b>Recently Updated</b></Typography>
            </Box>
            <Stack direction="column">
                {pages ? pages.map(p => <Link href={`/p/${p.slug}/`} key={p.id}>{p.title}</Link>) : undefined}
            </Stack>
        </Card>
    )
}