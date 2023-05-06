import { Autocomplete, Box, Button, Container, IconButton, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/client/Header";
import { Page } from "@/isaac/models";
import Link from "next/link";
import { Analytics, LibraryAdd } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import moment from 'moment';
import Theme from "@/client/Theme";

export default function Index() {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <>
            <Head>
                <title>ISAAC</title>
            </Head>
            {
                session ?
                    <Header disableSearchBar actions={
                        <Stack direction="row">
                            <IconButton onClick={() => router.push('/p/new')}>
                                <LibraryAdd htmlColor={Theme.COLOR.PRIMARY} />
                            </IconButton>
                            <IconButton onClick={() => router.push('/analytics')}>
                                <Analytics />
                            </IconButton>
                        </Stack>
                    } />
                    :
                    <GuestHeader />
            }
            <Background />
            <Box sx={{
                marginTop: -2.75,
            }}>
                <SearchModule />
                <PageBody />
            </Box>
        </>
    )
}

function GuestHeader() {
    return (
        <Box sx={{
            height: "64px",
            backgroundColor: Theme.COLOR.BACKGROUND_LIGHT,
            display: "flex",
            boxShadow: 5,
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography
                fontFamily="Encode Sans"
                fontSize="24px"
                color={Theme.COLOR.PRIMARY}
                letterSpacing="1em"
                textAlign="center"
                marginLeft="0.5em"
            >
                ISAAC
            </Typography>
        </Box>
    )
}

function Background() {
    return (
        <Box sx={{
            position: "relative",
            zIndex: -1,
            height: "30vh",
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mary_Gates_Hall%2C_April_2008.jpg/1280px-Mary_Gates_Hall%2C_April_2008.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
        }}>
            <Container maxWidth="md">
                <Stack spacing={2} direction="column" alignItems="center">
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
                                    boxShadow: 5,
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
            zIndex: 1,
        }}>
            <Container maxWidth="md">
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
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
    const [views, setViews] = useState<any>();

    useEffect(() => {
        fetch("/api/page/trending")
            .then(res => res.json())
            .then(results => {
                setPages(results.payload.pages);
                setViews(results.payload.views)
            })
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
                {pages && views ? pages.map((p, i) => <CardRow key={p.id} page={p} view={views[i].views} />) : undefined}
            </Stack>
        </Card>
    )
}

function RecentCard() {
    const [pages, setPages] = useState<Page[]>();

    useEffect(() => {
        fetch("/api/page?sort_type=recently_created&limit=5")
            .then(res => res.json())
            .then(results => setPages(results.payload))
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
                {pages ? pages.map((p, i) => <CardRow key={p.id} page={p} />) : undefined}
            </Stack>
        </Card>
    )
}

function CardRow(props: any) {
    const { page, view } = props;

    if (!view) {
        return (
            <>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <Link style={{
                        flex: '1'
                    }} href={`/p/${page.slug}/`} key={page.id}>{page.title}</Link>
                    <p style={{
                        marginTop: '0',
                        fontSize: '.75em'
                    }}>{moment(page.created_at).fromNow()}</p>
                </Box>
            </>
        )
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <Link style={{
                    flex: '1'
                }} href={`/p/${page.slug}/`} key={page.id}>{page.title}</Link>
                <p style={{
                    marginTop: '0',
                    fontSize: '.75em'
                }}>{Intl.NumberFormat('en-US', {
                        notation: "compact",
                        maximumFractionDigits: 1
                    }).format(view)} views</p>
            </Box>
        </>
    )
}