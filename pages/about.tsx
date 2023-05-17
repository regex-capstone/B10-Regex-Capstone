import "animate.css/animate.min.css";
import { Box, Typography, Container, Stack, Button, Grid } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { AnimationOnScroll } from 'react-animation-on-scroll';
import content from '@/public/about.json'
import Theme from "@/client/Theme";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { Pipeline } from "@/client/about/WhyComponent";
import Journey from "@/client/about/JourneyComponent"
import 'react-vertical-timeline-component/style.min.css';
import { useRouter } from "next/router";
import Header from "@/client/Header";

export default function About() {
    return (
        <Grid
            style={{
                width: "100%"
            }}
        >
            <Head>
                <title>About | ISAAC</title>
            </Head>
            <Header disableSearchBar />
            <Body />
        </Grid>
    )
}

function Body() {
    return (
        <Stack direction="column" spacing={0}>
            <Banner hero={content.hero} />
            <Team team={content.team} />
            <JourneyWrapper />
            <Why why={content.why} />
            <Scale />
            <Footer />
        </Stack>
    )
}

function Banner(props: any) {
    const router = useRouter()
    return (
        <Box sx={{
            height: "100vh",
            background: "linear-gradient(90deg, rgba(232,227,211,1) 0%, rgba(210,188,134,1) 100%)"
        }}>
            <Container maxWidth="md" sx={{
            }}>
                <Stack direction="column" spacing={1}>
                    <Box
                        component="img"
                        src="/gif/hero.gif"
                        style={{
                            width: "75%",
                            maxWidth: "500px",
                            margin: "auto"
                        }}
                    />
                    <Typography
                        fontFamily="Encode Sans"
                        fontSize="3rem"
                        fontWeight="bold"
                    >
                        {props.hero.title}
                    </Typography>
                    <Typography>
                        {props.hero.subtitle}
                    </Typography>
                    <Box sx={{
                        maxWidth: "300px"
                    }}>
                        <Button variant="contained" onClick={() => router.push("/")}>Launch</Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

function Why(props: any) {
    const { why } = props
    return (
        <Box sx={{
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        }}>
            <Container maxWidth="lg" sx={{
                paddingTop: "10vh",
                paddingBottom: "10vh"
            }}>
                <Stack direction="column" spacing={2}>
                    <Typography
                        fontFamily="Encode Sans"
                        fontWeight="bold"
                        fontSize="2rem"
                        textAlign="center"
                    >
                        {why.title}
                    </Typography>
                    <hr />
                    <Typography
                        textAlign="center"
                    >
                        {why.subtitle}
                    </Typography>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap"
                    }}>
                        {why.features.map((f: any, i: number) => {
                            return (
                                <Box key={i} sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}>
                                    <AnimationOnScroll initiallyVisible={true} delay={300 * i} duration={1} animateIn="animate__tada">
                                        <Box sx={{
                                            padding: "10px"
                                        }}>
                                            <Image src={f.icon} alt={f.attribution} width={200} height={200} />
                                            <Typography
                                                textAlign="center"
                                                padding="2px"
                                                maxWidth={200}
                                            >
                                                {f.text}
                                            </Typography>
                                        </Box>
                                    </AnimationOnScroll>
                                </Box>
                            )
                        })}
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

function Team(props: any) {
    const { team } = props
    return (
        <Box sx={{
            background: Theme.COLOR.PRIMARY,
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            zIndex: 1,
        }}>
            <Container maxWidth="md" sx={{
                paddingTop: "10vh",
                paddingBottom: "10vh",
                opacity: "100%",
                zIndex: 2,
            }}>
                <Box sx={{
                    color: "#FFF",
                }}>
                    <Typography
                        fontFamily="Encode Sans"
                        // fontWeight="bold"
                        fontSize="2rem"
                        textAlign="center"
                    >
                        {team.subtitle}
                    </Typography>
                </Box>
                <hr />
                <Box sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly"
                }}>
                    {team.team.map((member: any) => <TeamMemberCard key={member.name} member={member} />)}
                </Box>
            </Container>
        </Box>
    )
}

function TeamMemberCard(props: any) {
    const { member } = props
    return (
        <Box sx={{
            boxShadow: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px",
            padding: "10px",
            backgroundColor: "#FFF",
            borderRadius: "10px",
            width: "150px",
        }}>
            <Image src={member.picture} alt={member.name} width={150} height={150} />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "10px",
                paddingBottom: "10px"
            }}>
                <Typography
                    textAlign="center"
                    fontWeight="bold"
                >
                    {member.name}
                </Typography>
                <Typography
                    textAlign="center"
                    fontSize="0.8rem"
                    padding="5px"
                >
                    {member.roles}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <a target="_blank" rel="noreferrer" href={member.social.linkedin}><LinkedIn /></a>
                    <a target="_blank" rel="noreferrer" href={member.social.github}><GitHub /></a>
                </Stack>
            </Box>
        </Box>
    )
}

function Scale() {
    return (
        <Box sx={{
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
            backgroundColor: Theme.COLOR.BACKGROUND_DARK,
            color: Theme.COLOR.TEXT_LIGHT,
        }}>
            <Container maxWidth="lg" sx={{
                paddingTop: "10vh",
                paddingBottom: "10vh"
            }}>
                <Pipeline />
            </Container>
        </Box>

    )
}

function JourneyWrapper() {
    return (
        <Box sx={{
            backgroundColor: Theme.COLOR.BACKGROUND_DARK,
            width: "100%",
        }}>
            <Container maxWidth="lg" sx={{
                marginTop: "10vh",
                backgroundColor: Theme.COLOR.BACKGROUND_DARK,
                color: Theme.COLOR.TEXT_LIGHT
            }}>
                <Journey />
            </Container>
        </Box>
    )
}

function Footer() {
    return (
        <Box sx={{
            backgroundColor: Theme.COLOR.PRIMARY,
            color: Theme.COLOR.TEXT_LIGHT
        }}>
            <Typography
                textAlign="center"
            >
                &#169; REGEX 2023
            </Typography>
        </Box>
    )
}