import { Box, Grid, Typography } from "@mui/material";
import { ABOUT_JSON } from "./content";
import { AnimationOnScroll } from 'react-animation-on-scroll';

const why = {
    title: 'Why should you choose ISAAC?',
    subtitle: 'We have upgraded upon the current experience for the advisers to easily maintain and distribute information to students, and for the students to consume information in a quick, searchable manner.',
    features: [
        {
            icon: '/img/search-engine.png',
            text: 'A search engine to allow students to quickly find answers to their questions.',
            attribution: '<a href="https://www.flaticon.com/free-icons/web-portal" title="web portal icons">Web portal icons created by Vectors Tank - Flaticon</a>'
        },
        {
            icon: '/img/ssg.png',
            text: 'Static-Site Generation for fast loading times, SEO, and easy deployment.',
            attribution: '<a href="https://www.flaticon.com/free-icons/gear" title="gear icons">Gear icons created by DinosoftLabs - Flaticon</a>'
        },
        {
            icon: '/img/dashboard.png',
            text: 'Data analytic dashboards to enable advisers to make data-driven decisions.',
            attribution: '<a href="https://www.flaticon.com/free-icons/dashboard" title="dashboard icons">Dashboard icons created by Eucalyp - Flaticon</a>'
        },
        {
            icon: '/img/text-editor.png',
            text: 'The ability for advisers to easily add, update, remove, and import HTML  ',
            attribution: '<a href="https://www.flaticon.com/free-icons/text-editor" title="text editor icons">Text editor icons created by Noor Hakim - Flaticon</a>'
        }
    ]
}

export default function Why() {
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
                            why.title
                        }
                    </Typography>
                    <Typography
                        style={{
                            textAlign: 'center'
                        }}
                        variant="h6"
                    >
                        {
                            why.subtitle
                        }
                    </Typography>
                    <Section />
                </Grid>
            </Box>
        </>
    )
}

function Section() {
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
                    why.features.map((item, i) => (
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