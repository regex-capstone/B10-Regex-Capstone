import { Box, Container, Stack } from "@mui/material";
import Head from "next/head";

export default function Index() {
    return (
        <>
            <Head>
                <title>ISAAC</title>
            </Head>
            <Header />
            <Box sx={{
                width: "100%",
                position: "absolute",
                marginTop: "10rem",
            }}>
                <Container sx={{
                    backgroundColor: "#FCF",
                }}>
                    <Stack spacing={2} direction="column">
                        <div>Thing1</div>
                        <div>Thing2</div>
                        <div>Thing3</div>
                    </Stack>
                </Container>
            </Box>
            <Box sx={{
                // outline: "1px solid red",
                position: "relative",
                zIndex: -1,
                height: "50vh",
                backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mary_Gates_Hall%2C_April_2008.jpg/1280px-Mary_Gates_Hall%2C_April_2008.jpg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                filter: "blur(2px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }} />

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
            height: "4rem",
        }}>
            Header
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
            borderRadius: 5,
        }}>
            {props.children}
        </Box>
    )
}