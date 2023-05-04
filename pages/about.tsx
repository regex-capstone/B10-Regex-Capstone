import "animate.css/animate.min.css";
import { Box, Typography, Container, Stack } from "@mui/material";
import { ABOUT_JSON } from "@/client/about/content";
import Head from "next/head";

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
  // todo: retrieve this content from a db
  const CONTENT = ABOUT_JSON;
  return (
    <Stack direction="column" spacing={0}>
      <Banner hero={CONTENT.hero} />
    </Stack>
  )
}

function Banner(props: any) {
  return (
    <Box sx={{
      height: "100vh",
      paddingTop: "33vh",
      background: "linear-gradient(90deg, rgba(232,227,211,1) 0%, rgba(210,188,134,1) 100%)"
    }}>
      <Container maxWidth="md">
        <Stack direction="column" spacing={1}>
          <Typography
            fontFamily="Encode Sans"
            fontSize="2rem"
            fontWeight="bold"
          >
            {props.hero.title}
          </Typography>
          <Typography
            fontFamily="Open Sans"
            fontSize="1rem"
          >
            {props.hero.subtitle}
          </Typography>
          {/* <Button variant="contained">Button</Button> */}
        </Stack>
      </Container>
    </Box>
  )
}