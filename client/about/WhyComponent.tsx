import { Box, Grid, Typography } from "@mui/material";
import { ABOUT_JSON } from "./content";
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import Theme from "../Theme";
import { Check, Close, DateRange } from "@mui/icons-material";

const GOLD_COLOR = '#d2bc86';

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
                minHeight: '400px'
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
                            textAlign: 'center',
                            width: '60%'
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
            <Pipeline />
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


const pipeline = {
    title: 'How does ISAAC scale?',
    subtitle: 'We focused on building ISAAC into a modular, scalable system that will allow for future expansion and integration with external applications.',
    e: [
        {
            text: 'A centralized, accessible information repository to store information by advisers for students.',
            title: 'Information Repository',
            status: 'COMPLETED - v1.0',
            pic: '',    // TODO get picture
            icon: <Check />,
            color: '#7fc97f'
        },
        {
            text: 'A website that allows students to search and browse for answers to their simple, objective questions.',
            title: 'ISAAC Website',
            status: 'COMPLETED - v1.0',
            pic: '/img/home_page.png',
            icon: <Check />,
            color: '#7fc97f'
        },
        {
            text: 'Data analytics experience to help advisers make data-driven decisions.',
            title: 'Metrics and Data Analytics',
            status: 'COMPLETED - v2.0',
            pic: '',    // TODO get picture
            icon: <Check />,
            color: '#7fc97f'
        },
        {
            text: 'A decoupled, external API for other applications to consume ISAAC information.',
            title: 'ISAAC API',
            status: 'COMPLETED - v2.0',
            pic: '/img/api.png',
            icon: <Check />,
            color: '#7fc97f'
        },
        {
            text: 'External applications that consume the ISAAC API for students and advisers such as an AI Chatbot.',
            title: 'External Application Integrations',
            status: 'PLANNED - v3.0 (future Capstone project)',
            pic: '/img/pipeline_diagram.png',
            icon: <Close />,
            color: '#fc8d59'
        },
    ]
}

function Pipeline() {
    const components = pipeline.e.map((e, i) => {
        return (
            <VerticalTimelineElement
                key={i}
                iconStyle={{
                    backgroundColor: e.color,
                }}
                contentStyle={{
                    backgroundColor: Theme.COLOR.PRIMARY
                }}
                contentArrowStyle={{
                    borderRight: '7px solid',
                    borderRightColor: Theme.COLOR.PRIMARY
                }}
                icon={e.icon}
                date={e.status}
            >
                <Grid
                    style={{
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                    container
                >
                    <Typography
                        variant="h5"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                        }}
                    >
                        {e.title}
                    </Typography>
                    <Box
                        component="img"
                        src={e.pic}
                        style={{
                            marginTop: '15px',
                            marginBottom: '15px',
                            maxWidth: '250px',
                            backgroundColor: Theme.COLOR.TEXT_LIGHT,
                            boxShadow: '0px 0px 10px 0px rgba(255, 255, 255,0.75)'
                        }}
                    ></Box>
                    <Typography
                        variant="h6"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            textAlign: 'center',
                            fontSize: '95%'
                        }}
                    >
                        {e.text}
                    </Typography>
                </Grid>
            </VerticalTimelineElement>
        )
    })
    return (
        <>
            <Typography
                variant="h3"
                style={{
                    paddingBottom: '20px',
                    textAlign: 'center'
                }}
            >
                {
                    pipeline.title
                }
            </Typography>
            <Typography
                style={{
                    textAlign: 'center',
                    width: '60%',
                    paddingBottom: '50px',
                    margin: 'auto'
                }}
                variant="h6"
            >
                {
                    pipeline.subtitle
                }
            </Typography>
            <Grid
                sx={{
                    alignContent: 'center',
                    justifyContent: 'center'
                }}
                container
            >
            </Grid>
            <VerticalTimeline
                animate={true}
                lineColor={GOLD_COLOR}
            >
                {components}
            </VerticalTimeline>
        </>
    )
}