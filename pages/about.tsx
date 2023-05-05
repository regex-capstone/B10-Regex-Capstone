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
            boxShadow: 5,
        }}>
            <Container maxWidth="lg" sx={{
                paddingTop: "10vh",
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