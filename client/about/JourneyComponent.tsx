import { Box, Divider, Grid, Typography } from "@mui/material";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { DateRange } from "@mui/icons-material";
import Theme from "../Theme";

const journey = {
    text_1: 'Alan reached out to the advising team with a basic inquiry about VLPA credit equivalency for the three foreign language classes he took at the Bothell campus.',
    text_2: 'No response yet.',
    text_3: 'Alan reached out again to follow up with his inquiry four months later.',
    text_4: 'Response received! \n "I apologize for the delayed response. Our office was short staffed, and many emails got buried in our inbox - I saw that your message was still unresolved..."— an iSchool Adviser',
    text_6: 'Hence, we threw together a presentation proposal pitch, defined the information problem, and met with the iSchool Advising Team to solve this problem:',
}

export default function Journey() {
    return (
        <Box>
            <Team />
            <Introduction />
            <Questions />
            <Validation />
            <Pipeline />
        </Box>
    )
}

function Introduction() {
    return (
        <Grid>
            <VerticalTimeline
                animate={true}
                lineColor={'#d2bc86'}
            >
                <VerticalTimelineElement
                    iconStyle={{
                        backgroundColor: '#d2bc86',
                    }}
                    contentStyle={{
                        backgroundColor: Theme.COLOR.PRIMARY
                    }}
                    contentArrowStyle={{
                        borderRight: '7px solid',
                        borderRightColor: Theme.COLOR.PRIMARY
                    }}
                    date="5/11/2022"
                    icon={<DateRange />}
                >
                    <Typography
                        variant="h6"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            padding: '15px',
                            textAlign: 'center'
                        }}
                    >
                        {journey.text_1}
                    </Typography>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    iconStyle={{
                        backgroundColor: '#d2bc86',
                    }}
                    contentStyle={{
                        backgroundColor: Theme.COLOR.PRIMARY
                    }}
                    contentArrowStyle={{
                        borderRight: '7px solid',
                        borderRightColor: Theme.COLOR.PRIMARY
                    }}
                    date="9/12/2022"
                    icon={<DateRange />}
                >
                    <Typography
                        variant="h6"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            padding: '15px',
                            textAlign: 'center'
                        }}
                    >
                        {journey.text_3}
                    </Typography>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    iconStyle={{
                        backgroundColor: '#d2bc86',
                    }}
                    contentStyle={{
                        backgroundColor: Theme.COLOR.PRIMARY
                    }}
                    contentArrowStyle={{
                        borderRight: '7px solid',
                        borderRightColor: Theme.COLOR.PRIMARY
                    }}
                    date="9/13/2022"
                    icon={<DateRange />}
                >
                    <Typography
                        variant="h6"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            padding: '15px',
                            textAlign: 'center'
                        }}
                    >
                        {journey.text_4.split('\n')[0]}
                        <br></br>
                        {journey.text_4.split('\n')[1]}
                    </Typography>
                </VerticalTimelineElement>
            </VerticalTimeline>
            <Typography
                variant="h5"
                style={{
                    padding: 50,
                    textAlign: 'center',
                    margin: 'auto',
                    width: '60%'
                }}
            >
                {journey.text_6}
            </Typography>
            <Box
                style={{
                    backgroundColor: '#f5f5f5',
                    width: '80%',
                    borderRadius: '20px',
                    margin: 'auto',
                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)'
                }}
            >
                <Typography
                    variant="h3"
                    style={{
                        padding: '50px',
                        textAlign: 'center'
                    }}
                >
                    {questions.problem}
                </Typography>
            </Box>
        </Grid>
    )
}

const team = {
    title: 'The Birth of ISAAC',
    subtitle: 'It all started with our personal experiences as undergraduate students of the iSchool...',
    team: [
        {
            name: 'Elbert Cheng',
            roles: ['Project Lead'],
            picture: '/img/team/elbert.png'
        },
        {
            name: 'Alan Wen',
            roles: ['Project Engineer'],
            picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
        {
            name: 'Keith Ellingwood',
            roles: ['Data Engineer'],
            picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
        {
            name: 'Ryan Langford',
            roles: ['Front-end Engineer'],
            picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
        {
            name: 'Brian Park',
            roles: ['Front-end Engineer'],
            picture: '/img/team/brian.jpg'
        }
    ],
}

function Team() {
    return (
        <>
            <Typography
                variant="h3"
                style={{
                    padding: '50px',
                    textAlign: 'center'
                }}
            >
                {
                    team.title
                }
            </Typography>
            <Typography
                variant="h6"
                style={{
                    padding: '50px',
                    textAlign: 'center'
                }}
            >
                {
                    team.subtitle
                }
            </Typography>
            <Grid
                style={{
                    padding: '50px'
                }}
            >
                <Grid
                    container
                    style={{
                        alignContent: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        display: 'flex'
                    }}
                >
                    {
                        team.team.map((member, i) => {
                            return (
                                <AnimationOnScroll key={i} animateIn="animate__fadeInLeftBig">
                                    <Grid
                                        style={{
                                            alignContent: 'center',
                                            justifyContent: 'center',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: '20px'
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            sx={{
                                                height: 200,
                                                width: 200,
                                                borderRadius: '50%'
                                            }}
                                            src={member.picture}
                                            alt='team profile picture'
                                        />
                                        <Typography
                                            variant="h6"
                                            style={{
                                                paddingTop: '10px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {
                                                member.name
                                            }
                                        </Typography>
                                        {
                                            member.roles.map((role) => {
                                                return (
                                                    <Typography
                                                        variant="h6"
                                                        style={{
                                                            textAlign: 'center',
                                                            opacity: '0.6'
                                                        }}
                                                    >
                                                        {
                                                            role
                                                        }
                                                    </Typography>
                                                )
                                            })
                                        }
                                    </Grid>
                                </AnimationOnScroll>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </>
    )
}

const advisers = {
    title: 'iSchool Advising Team',
    members: [
        {
            name: 'Dowell Eugenio',
            roles: ['iSchool Adviser', 'Main Stakeholder'],
            picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
        {
            name: 'Elisa Tran',
            roles: ['iSchool Adviser'],
            picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
        {
            name: 'Matt Trease',
            roles: ['iSchool Adviser'],
            picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
        {
            name: 'Kathy Mitchell',
            roles: ['iSchool Adviser'],
            picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
    ],
    title_2: 'Adviser Pain Points:',
    aspects: [
        'Post-COVID, email inquiries for simple, objective questions that don\'t require human interaction have increased exponentially.',
        'In 2022, the iSchool enrolled 839 students and plans to admit up to 1,400 annually in the future, which will result in a heavier workload for the advising team.',
        'The existing Canvas Informatics Resource Site... TODO',
    ]
}

function Advisers() {
    return (
        <>
            <Grid
                container
                style={{
                    alignContent: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    display: 'flex'
                }}
            >
                {
                    advisers.members.map((member) => {
                        return (
                            <Grid
                                style={{
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '20px'
                                }}
                            >
                                <Box
                                    component="img"
                                    sx={{
                                        height: 200,
                                        borderRadius: '50%'
                                    }}
                                    src={member.picture}
                                    alt='team profile picture'
                                />
                                <Typography
                                    variant="h6"
                                    style={{
                                        paddingTop: '10px',
                                        textAlign: 'center'
                                    }}
                                >
                                    {
                                        member.name
                                    }
                                </Typography>
                                {
                                    member.roles.map((role) => {
                                        return (
                                            <Typography
                                                variant="h6"
                                                style={{
                                                    textAlign: 'center',
                                                    opacity: '0.6'
                                                }}
                                            >
                                                {
                                                    role
                                                }
                                            </Typography>
                                        )
                                    })
                                }
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}

const questions = {
    title_1: 'Simple, Objective Questions',
    desc_1: 'Questions that have objective answers derived from sources of truth like university/departmental policies',
    title_2: 'Complex, Subjective Questions',
    desc_2: 'Questions that is dependent on a student\'s context that may require action and/or personal guidance from an adviser.',
    mission: 'We aim to allow...',
    mission_1: 'Advisers to focus on students with complex, subjective questions.',
    mission_2: 'Students to receive answers to simple, objective questions within minutes rather than days.',
    problem: 'How might we streamline the processing of simple advising questions for both students and student services?'
}

function Questions() {
    return (
        <>
            <Grid
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F5F5F5'
                }}
                container
            >
                <Grid
                    style={{
                        width: '33%'
                    }}
                    item
                >
                    <Typography
                        variant="h4"
                        style={{
                            padding: '50px',
                            textAlign: 'center'
                        }}
                    >
                        {questions.title_1}
                    </Typography>
                    <Typography
                        variant="h6"
                        style={{
                            padding: '50px',
                            textAlign: 'center'
                        }}
                    >
                        {questions.desc_1}
                    </Typography>
                </Grid>
                <Grid
                    item
                >
                    <Divider
                        orientation="vertical"
                    />
                </Grid>
                <Grid
                    style={{
                        width: '33%'
                    }}
                    item
                >
                    <Typography
                        variant="h4"
                        style={{
                            padding: '50px',
                            textAlign: 'center'
                        }}
                    >
                        {questions.title_2}
                    </Typography>
                    <Typography
                        variant="h6"
                        style={{
                            padding: '50px',
                            textAlign: 'center'
                        }}
                    >
                        {questions.desc_2}
                    </Typography>
                </Grid>
            </Grid>
            <Typography
                variant="h4"
                style={{
                    padding: '50px',
                    textAlign: 'center'
                }}
            >
                {questions.mission}
            </Typography>
            <Grid
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
                container
            >
                <Grid
                    style={{
                        width: '25%'
                    }}
                    item
                >
                    <Typography
                        variant="h5"
                        style={{
                            padding: '50px',
                            textAlign: 'center'
                        }}
                    >
                        {questions.mission_1}
                    </Typography>
                </Grid>
                <Grid
                    style={{
                        width: '25%'
                    }}
                    item
                >
                    <Typography
                        variant="h5"
                        style={{
                            padding: '50px',
                            textAlign: 'center'
                        }}
                    >
                        {questions.mission_2}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

const validation = {
    title: 'Validating the Problem',
    text_1: 'To validate our problem, we extensively interviewed the iSchool Advising Team and iSchool students to define pain points for the current method of getting simple advising questions answered.',
    text_2: 'iSchool Adviser pain points:',
    bullets_1: [
        'Increased email inquiries for simple, objective questions post-COVID.',
        'The iSchool enrolled 839 students in 2022 and plans to admit up to 1,400 annually in the future, leading to a heavier workload for the advising team.',
        'Need to create and maintain a FAQ page',
        'Unable to track article usefulness or student interest.',
        'Advisers are unable to update information on the official website promptly so they need to use external platforms to deliver information to students.'

    ],
    text_3: 'iSchool (current and prospective) student pain points:',
    bullets_2: [
        'Multiple sources of information, like the Canvas Informatics Resource Site and UW Degree Audit, have outdated and conflicting information.',
        'Some students are not aware of current information resources, such as the Canvas Informatics Resource Site.',
        'Current methods of contacting advisers for simple questions are time inefficient and require scheduling appointments far in advance.',
        'Canvas Informatics Resource Site lacks search capabilities.'
    ],
    text_4: 'Therefore, our capstone proposes an iterative, scalable open-sourced solution to help the iSchool advising team to scale with its student body.'
}

function Validation() {
    return (
        <>
            <Grid>
                <Typography
                    variant="h3"
                    style={{
                        padding: '50px',
                        textAlign: 'center'
                    }}
                >
                    {validation.title}
                </Typography>
                <Typography
                    variant="h5"
                    style={{
                        padding: '50px',
                        textAlign: 'center'
                    }}
                >
                    {validation.text_1}
                </Typography>
                <Typography
                    variant="h5"
                    style={{
                        padding: '50px',
                        textAlign: 'center'
                    }}
                >
                    {validation.text_2}
                </Typography>
                <Grid
                    style={{
                        textAlign: 'center'
                    }}
                >
                    {   // TODO bullet styling?
                        validation.bullets_1.map((bullet) => {
                            return (
                                <ul>{bullet}</ul>
                            )
                        })
                    }
                </Grid>
                <Typography
                    variant="h5"
                    style={{
                        padding: '50px',
                        textAlign: 'center'
                    }}
                >
                    {validation.text_3}
                </Typography>
                <Grid
                    style={{
                        textAlign: 'center'
                    }}
                >
                    {   // TODO bullet styling?
                        validation.bullets_2.map((bullet) => {
                            return (
                                <ul>{bullet}</ul>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </>
    )
}

const pipeline = {
    text_1: 'A centralized, accessible information repository to store information by advisers for students.',
    title_1: 'Information Repository',
    text_2: 'A website that allows students to search and browse for answers to their simple, objective questions.',
    title_2: 'ISAAC Website',
    text_3: 'Data analytics experience to help advisers make data-driven decisions.',
    title_3: 'Metrics and Data Analytics',
    text_4: 'A decoupled, external API for other applications to consume ISAAC information.',
    title_4: 'ISAAC API',
    text_5: 'External applications that consume the ISAAC API for students and advisers such as an AI Chatbot.',
    title_5: 'External Application Integrations',
}

function Pipeline() {
    return (
        <>
            <Grid
                sx={{
                    alignContent: 'center',
                    justifyContent: 'center'
                }}
                container
            >
                <Box
                    style={{
                        padding: '50px',

                    }}
                    component='img'
                    src='/img/pipeline_diagram.png'
                ></Box>

            </Grid>
            <VerticalTimeline
                animate={true}
                lineColor={'#d2bc86'}
            >
                <VerticalTimelineElement
                    iconStyle={{
                        backgroundColor: '#d2bc86',
                    }}
                    contentStyle={{
                        backgroundColor: Theme.COLOR.PRIMARY
                    }}
                    contentArrowStyle={{
                        borderRight: '7px solid',
                        borderRightColor: Theme.COLOR.PRIMARY
                    }}
                    icon={<DateRange />}
                >
                    <Typography
                        variant="h4"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            padding: '15px',
                            textAlign: 'center'
                        }}
                    >
                        {pipeline.title_1}
                    </Typography>
                    <Typography
                        variant="h6"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            padding: '15px',
                            textAlign: 'center'
                        }}
                    >
                        {pipeline.text_1}
                    </Typography>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    iconStyle={{
                        backgroundColor: '#d2bc86',
                    }}
                    contentStyle={{
                        backgroundColor: Theme.COLOR.PRIMARY
                    }}
                    contentArrowStyle={{
                        borderRight: '7px solid',
                        borderRightColor: Theme.COLOR.PRIMARY
                    }}
                    icon={<DateRange />}
                >
                    <Typography
                        variant="h4"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            padding: '15px',
                            textAlign: 'center'
                        }}
                    >
                        {pipeline.title_2}
                    </Typography>
                    <Typography
                        variant="h6"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            padding: '15px',
                            textAlign: 'center'
                        }}
                    >
                        {pipeline.text_2}
                    </Typography>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    iconStyle={{
                        backgroundColor: '#d2bc86',
                    }}
                    contentStyle={{
                        backgroundColor: Theme.COLOR.PRIMARY
                    }}
                    contentArrowStyle={{
                        borderRight: '7px solid',
                        borderRightColor: Theme.COLOR.PRIMARY
                    }}
                    icon={<DateRange />}
                >
                    <Typography
                        variant="h4"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            padding: '15px',
                            textAlign: 'center'
                        }}
                    >
                        {pipeline.title_3}
                    </Typography>
                    <Typography
                        variant="h6"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            padding: '15px',
                            textAlign: 'center'
                        }}
                    >
                        {pipeline.text_3}
                    </Typography>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    iconStyle={{
                        backgroundColor: '#d2bc86',
                    }}
                    contentStyle={{
                        backgroundColor: Theme.COLOR.PRIMARY
                    }}
                    contentArrowStyle={{
                        borderRight: '7px solid',
                        borderRightColor: Theme.COLOR.PRIMARY
                    }}
                    icon={<DateRange />}
                >
                    <Typography
                        variant="h4"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            padding: '15px',
                            textAlign: 'center'
                        }}
                    >
                        {pipeline.title_4}
                    </Typography>
                    <Typography
                        variant="h6"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            padding: '15px',
                            textAlign: 'center'
                        }}
                    >
                        {pipeline.text_4}
                    </Typography>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    iconStyle={{
                        backgroundColor: '#d2bc86',
                    }}
                    contentStyle={{
                        backgroundColor: Theme.COLOR.PRIMARY
                    }}
                    contentArrowStyle={{
                        borderRight: '7px solid',
                        borderRightColor: Theme.COLOR.PRIMARY
                    }}
                    icon={<DateRange />}
                >
                    <Typography
                        variant="h4"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            padding: '15px',
                            textAlign: 'center'
                        }}
                    >
                        {pipeline.title_5}
                    </Typography>
                    <Typography
                        variant="h6"
                        style={{
                            color: Theme.COLOR.TEXT_LIGHT,
                            padding: '15px',
                            textAlign: 'center'
                        }}
                    >
                        {pipeline.text_5}
                    </Typography>
                </VerticalTimelineElement>
            </VerticalTimeline>
        </>
    )
}