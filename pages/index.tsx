import { Autocomplete, AutocompleteRenderInputParams, Avatar, Box, Button, Container, Icon, IconButton, Stack, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SearchIcon from '@mui/icons-material/Search';
import Head from "next/head";
import { ReactNode } from "react";
import InputUnstyled from '@mui/base/InputUnstyled';


export default function Index() {
    return (
        <>
            <Head>
                <title>ISAAC</title>
            </Head>
            <Header />
            <Box sx={{
                // outline: "1px solid red",
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
            <Box sx={{
                width: "100%",
                // backgroundColor: "#FAD",
                zIndex: 0,
                position: "absolute",
                top: 0,
                left: 0,
                marginTop: "15vh",
            }}>
                <Container>
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
                        <SearchBar />
                        <Stack spacing={1} direction="row">
                            <Button variant="contained">
                                Search
                            </Button>
                            <Button variant="contained">
                                Browse TOpics
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Box sx={{
                height: "100%",
                backgroundColor: "#FFF",
                padding: 2,
                margin: 0,
                position: "relative",
                zIndex: 1,
            }}>
                <Container>
                    <Stack spacing={2} direction="column" sx={{
                        marginTop: "-2rem"
                    }}>
                        <Card>
                            card
                        </Card>
                        <Card>
                            card
                        </Card>
                        <Card>
                            card
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

function Header() {
    return (
        <Box sx={{
            position: "fixed",
            top: 0,
            backgroundColor: "#FFF",
            boxShadow: 5,
            width: "100%",
        }}>
            <Stack spacing={2} direction="row" sx={{
                display: "flex",
                alignItems: "left",
                justifyContent: "right",
            }}>
                <Stack spacing={0} direction="row" sx={{
                    flex: 1,
                }}>
                    <IconButton>
                        <img height="32" width="32" src="https://ischool.uw.edu/sites/default/files/inline-images/logo-black-symbol2.jpg" />
                    </IconButton>
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                    <IconButton>
                        <AnalyticsIcon />
                    </IconButton>
                </Stack>
                <IconButton>
                    <Avatar src="https://media.licdn.com/dms/image/D5603AQGhcM-bkkBW6w/profile-displayphoto-shrink_100_100/0/1669079083666?e=1686182400&v=beta&t=VIl10WQqHZMjTVFvJHGrOsp2m5lMlkwhrOmEp4o71Ww" />
                </IconButton>
            </Stack>
        </Box>
    )
}

function SearchBar() {
    return (
        <Box sx={{
            minWidth: "60%",
        }}>
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                // TODO: Add Autosugggestions
                options={["Suggestion 1", "Suggestion 2", "Suggestion 3"]}
                renderInput={(params) => <TextField
                    {...params}
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
    )
}

function Card(props: any) {
    return (
        <Box sx={{
            // outline: "1px solid red",
            backgroundColor: "#FFF",
            boxShadow: 5,
            padding: 2,
            borderRadius: 5,
        }}>
            {props.children}
        </Box>
    )
}