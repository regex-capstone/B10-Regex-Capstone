import { Box, Grid, Typography } from "@mui/material";
import { ABOUT_JSON } from "./content";
import { AnimationOnScroll } from 'react-animation-on-scroll';

export default function Why() {
    const CONTENT = ABOUT_JSON;

    return (
        <>
            <Box sx={{
                flexGrow: 1,
                minHeight: '400px',
                backgroundColor: '#f5f5f5'
            }}>
                <Grid
                    container
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        padding: '50px'
                    }}
                >
                    <Typography
                        variant="h3"
                        style={{
                            paddingBottom: '20px'
                        }}
                    >
                        {
                            CONTENT.why.title
                        }
                    </Typography>
                    <Typography
                        style={{
                            textAlign: 'center',
                            marginLeft: 300,
                            marginRight: 300
                        }}
                        variant="h6"
                    >
                        {
                            CONTENT.why.subtitle
                        }
                    </Typography>
                    <Section />
                </Grid>
            </Box>
        </>
    )
}

function Section() {
    const CONTENT = ABOUT_JSON;
    return (
        <>
            <Grid
                container
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '500px',
                }}
            >
                {
                    CONTENT.why.features.map((item, i) => (
                        <Grid
                            item
                            xs={12}
                            md={2}
                            minHeight={300}
                            key={item.text}
                            style={{
                                textAlign: 'center',
                                padding: '30px',
                                borderRadius: '10px',
                                margin: '10px !important',
                            }}
                        >

                            <AnimationOnScroll initiallyVisible={true} delay={1500 * i} duration={1} animateIn="animate__tada">
                                <img
                                    src={item.icon}
                                    style={{
                                        width: '125px'
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                >{item.text}</Typography>
                            </AnimationOnScroll>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}