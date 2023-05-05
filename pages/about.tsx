import "animate.css/animate.min.css";
import { Box, Typography, Container, Stack } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { AnimationOnScroll } from 'react-animation-on-scroll';
import content from '@/public/about.json'

export default function About() {
    return (
        <>
            <Head>
                <title>About ISAAC</title>
            </Head>
            <Body />
        </>
    )
}

function Body() {
    return (
        <Stack direction="column" spacing={0}>
            <Banner hero={content.hero} />
            <Why why={content.why} />
            <Team team={content.team} />
        </Stack>
    )
}

function Banner(props: any) {
    return (
        <Box sx={{
            height: "100vh",
            background: "linear-gradient(90deg, rgba(232,227,211,1) 0%, rgba(210,188,134,1) 100%)"
        }}>
            <Container maxWidth="md" sx={{
                paddingTop: "20vh",
            }}>
                <Stack direction="column" spacing={1}>
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
                    {/* <Button variant="contained">Button</Button> */}
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
            height: "100vh",
            background: "#000",
            zIndex: 1,
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mary_Gates_Hall%2C_April_2008.jpg/1280px-Mary_Gates_Hall%2C_April_2008.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        }}>
            <Container maxWidth="md" sx={{
                paddingTop: "10vh",
                paddingBottom: "10vh",
                opacity: "100%",
                zIndex: 2,
            }}>
                <Box sx={{
                    padding: "10px",
                    backgroundColor: "#FFF",
                    borderRadius: "10px"
                }}>
                    <Typography
                        fontFamily="Encode Sans"
                        fontWeight="bold"
                        fontSize="1rem"
                        textAlign="center"
                    >
                        {team.subtitle}
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexWrap: "wrap"
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
            flex: 1,
            padding: "10px",
            backgroundColor: "#FFF",
            borderRadius: "10px"
        }}>
            <Box sx={{
                borderRadius: 50,
                backgroundColor: "red",
            }}>
                <Image src={member.picture} alt={member.name} width={100} height={100} />
            </Box>
            {member.name}
        </Box>
    )
}