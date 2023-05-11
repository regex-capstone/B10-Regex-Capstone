import { Box, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { ArrowForward, ArrowForwardIos, CheckBox, CheckBoxOutlineBlank, DateRange, IndeterminateCheckBox } from "@mui/icons-material";
import Theme from "../Theme";

const GOLD_COLOR = '#d2bc86';

const journey = {
    intro_1: 'Alan emailed the iSchool Advising team...',
    text_1_1: 'Appointments had to be scheduled a month in advance, and emails for general questions were not able to be answered in a timely manner.',
    text_1: 'Hi! I took 15 credits of Japanese at UW-Bothell and got only five. Could I get the other 10 credits transferred over? Thanks!',
    text_2: 'No response yet.',
    text_3: 'Hi... I wanted to follow-up on my previous email...',
    text_4: '"I apologize for the delayed response. Our office was short staffed, and many emails got buried in our inbox - I saw that your message was still unresolved..."',
    text_6: 'We defined the information problem and threw together a presentation proposal pitch...',
    text_7: 'On December 12th, 2022, we met with the iSchool Advising team learn more about their challenges and how we could help.'
}

export default function Journey() {
    return (
        <Box>
            <Introduction />
            <Questions />
        </Box>
    )
}

function Introduction() {
    return (
        <>
            <Stack direction="row" spacing={1} style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography
                    variant="h4"
                    style={{
                        textAlign: 'center',
                        paddingBottom: '3rem'
                    }}
                >
                    {journey.intro_1}
                </Typography>
            </Stack>
            <VerticalTimeline
                animate={true}
                lineColor={GOLD_COLOR}
            >
                <VerticalTimelineElement
                    iconStyle={{
                        backgroundColor: GOLD_COLOR,
                    }}
                    contentStyle={{
                        backgroundColor: Theme.COLOR.PRIMARY,
                    }}
                    contentArrowStyle={{
                        borderRight: '7px solid',
                        borderRightColor: Theme.COLOR.PRIMARY
                    }}
                    date="5/11/2022"
                    icon={<DateRange />}
                >
                    <Stack direction="row">
                        <Box
                            component="img"
                            src="/img/team/alan.png"
                            style={{
                                borderRadius: '50%',
                                width: '7rem',
                                height: '7rem',
                                marginRight: '1rem',
                                alignSelf: 'center'
                            }}
                        ></Box>
                        <Divider orientation="vertical" style={{ backgroundColor: '#FFFFFF', alignSelf: 'center', marginRight: '20px', height: '100px' }} />
                        <Typography
                            variant="h6"
                            style={{
                                color: Theme.COLOR.TEXT_LIGHT,
                            }}
                        >
                            {journey.text_1}
                        </Typography>
                    </Stack>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    iconStyle={{
                        backgroundColor: GOLD_COLOR,
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
                    <Stack direction="row">
                        <Typography
                            variant="h6"
                            style={{
                                color: Theme.COLOR.TEXT_LIGHT,
                            }}
                        >
                            {journey.text_3}
                        </Typography>
                        <Divider orientation="vertical" style={{ backgroundColor: '#FFFFFF', alignSelf: 'center', marginRight: '10px', height: '100px' }} />
                        <Box
                            component="img"
                            src="/img/team/alan.png"
                            style={{
                                borderRadius: '50%',
                                width: '7rem',
                                height: '7rem',
                                marginRight: '1rem',
                                alignSelf: 'center'
                            }}
                        ></Box>
                    </Stack>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    iconStyle={{
                        backgroundColor: GOLD_COLOR,
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
                    <Stack direction="row">
                        <Box
                            component="img"
                            src="/img/ischool.png"
                            style={{
                                borderRadius: '50%',
                                width: '7rem',
                                height: '7rem',
                                marginRight: '1rem',
                                alignSelf: 'center'
                            }}
                        ></Box>
                        <Divider orientation="vertical" style={{ backgroundColor: '#FFFFFF', alignSelf: 'center', marginRight: '20px', height: '100px' }} />
                        <Typography
                            variant="h6"
                            style={{
                                color: Theme.COLOR.TEXT_LIGHT,
                            }}
                        >
                            {journey.text_4}
                        </Typography>
                    </Stack>
                </VerticalTimelineElement>
            </VerticalTimeline>
            <Typography
                variant="h4"
                style={{
                    padding: 75,
                    textAlign: 'center',
                    margin: 'auto',
                    width: '80%'
                }}
            >
                {journey.text_7}
            </Typography>
            <Advisers />
        </>
    )
}

const advisers = {
    title: 'iSchool Advising Team',
    members: [
        {
            name: 'Dowell Eugenio',
            roles: ['iSchool Adviser*'],
            picture: '/img/advisers/dowell.jpg'
        },
        {
            name: 'Elisa Tran',
            roles: ['iSchool Adviser'],
            picture: '/img/advisers/elisa.jpg'
        },
        {
            name: 'Matt Trease',
            roles: ['iSchool Adviser'],
            picture: '/img/advisers/matt.jpg'
        },
        {
            name: 'Kathy Mitchell',
            roles: ['iSchool Adviser'],
            picture: '/img/advisers/kathy.jpg'
        },
    ],
    title_2: 'Adviser Pain Points:',
    aspects: [
        'Post-COVID, email inquiries for simple, objective questions that don\'t require human interaction have increased exponentially.',
        'In 2022, the iSchool enrolled 839 students and plans to admit up to 1,400 annually in the future, which will result in a heavier workload for the advising team.',
        'The existing Canvas Informatics Resource Site... TODO',
    ]
}

export function Advisers() {
    // TODO: I have no clue how to center this spaghetti code
    return (
        <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {
                advisers.members.map((member, i) => {
                    return (
                        <Grid
                            key={i}
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
                                    borderRadius: '50%',
                                    boxShadow: `0px 0px 15px 0px ${GOLD_COLOR}`
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
                            <Grid
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                {
                                    member.roles.map((role) => {
                                        return (
                                            <Typography
                                                key={role}
                                                variant="h6"
                                                style={{
                                                    textAlign: 'center',
                                                    opacity: '0.8',
                                                    flex: 1,
                                                    margin: 'auto'
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
                        </Grid>
                    )
                })
            }
            <Typography
                variant="h6"
                style={{
                    textAlign: 'center',
                    marginRight: '60%',
                    opacity: '0.8'
                }}
            >
                * = Project Owner
            </Typography>
        </Box>
    )
}

export function Questions() {
    return (
        <Grid>
            <Grid
                style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                    color: Theme.COLOR.TEXT_DARK
                }}
                container
            >
                <Typography
                    variant="h4"
                    style={{
                        padding: '10px',
                    }}
                >
                    {questions.introduction}
                </Typography>
                <Typography
                    variant="h6"
                    style={{
                        padding: '10px',
                    }}
                >
                    {questions.subtitle}
                </Typography>
                <Stack direction="row" spacing={3}>
                    <QuestionBox bullets={questions.simple_questions} title={questions.title_1} />
                    <QuestionBox bullets={questions.complex_questions} title={questions.title_2} />
                </Stack>
                <PainPoints />
                <Grid style={{
                    padding: '50px'
                }}>
                    <ProblemStatementBox desc={questions.problem} />
                </Grid>
            </Grid>
        </Grid>
    )
}

// TODO style and maybe content cut
const pain_points = {
    title: 'Key Pain Points',
    subtitle: 'To validate our problem, we extensively interviewed the iSchool Advising team and iSchool students to define pain points for the current method of getting simple advising questions answered.',
    card_title_1: 'iSchool Adviser',
    bullets_1: [
        'Increased email inquiries for simple, objective questions post-COVID.',
        'The iSchool enrolled 839 students in 2022 and plans to admit up to 1,400 annually in the future, leading to a heavier workload for the advising team.',
        'Need to create and maintain a FAQ page.',
        'Unable to track article usefulness or student interest.',
        'Advisers are unable to update information on the official website promptly so they need to use external platforms to deliver information to students.'

    ],
    card_title_2: 'UW Student',
    bullets_2: [
        'Multiple sources of information, like the Canvas Informatics Resource Site and UW Degree Audit, have outdated and conflicting information.',
        'Some students are not aware of current information resources, such as the Canvas Informatics Resource Site.',
        'Current methods of contacting advisers for simple questions are time inefficient and require scheduling appointments far in advance.',
        'Canvas Informatics Resource Site lacks search capabilities.'
    ],
    text_4: 'Therefore, our capstone proposes an iterative, scalable open-sourced solution to help the iSchool advising team to scale with its student body.'
}

export function PainPoints() {
    return (
        <>
            <Typography
                variant="h6"
                style={{
                    padding: '30px',
                }}
            >
                {pain_points.subtitle}
            </Typography>
            <Stack direction="row" spacing={2}>
                <PainPointsBox bullets={pain_points.bullets_1} title={pain_points.card_title_1} />
                <PainPointsBox bullets={pain_points.bullets_2} title={pain_points.card_title_2} />
            </Stack>
        </>
    )
}

const questions = {
    introduction: 'From our user interviews and research: ',
    subtitle: 'Advising inquiries can be broken into an abstraction of complexities.',
    title_1: 'Simple, Objective Questions',
    simple_questions: [
        "Questions that have objective answers derived from sources of truth like university/departmental policies.",
        "No need to get a human adviser involved.",
        "e.g. Could I replace INFO 330 (Database and Data Modeling) with CSE 414 (Introduction to Database Systems)?"
    ],
    title_2: 'Complex, Subjective Questions',
    complex_questions: [
        "Questions that have subjective answers that require human judgement.",
        "Requires a human adviser to effectively guide students",
        "e.g. I am a transfer student and I am not sure if I should take INFO 200 (Intellectual Foundations of Informatics) or INFO 201 (Technical Foundations of Informatics) first."
    ],
    problem: 'So how might we streamline the processing of simple advising questions for both students and student services?'
}

function QuestionBox(props: any) {
    const { bullets, title } = props;
    return (
        <Box
            sx={{
                borderRadius: '5px',
                boxShadow: '5px 5px 5px rgba(255, 255, 255, 0.3)',
                backgroundColor: Theme.COLOR.BACKGROUND_LIGHT
            }}
        >
            <Typography
                variant="h4"
                style={{
                    padding: '25px',
                    textAlign: 'center'
                }}
            >
                {title}
            </Typography>
            <Stack direction="row">
                <List>
                    {
                        bullets.map((bullet: string) => {
                            return (
                                <ListItem
                                    key={bullet}
                                >
                                    <ListItemIcon>
                                        <ArrowForwardIos />
                                    </ListItemIcon>
                                    <ListItemText primary={bullet} />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Stack>
        </Box>

    )
}

function ProblemStatementBox(props: any) {
    const { desc } = props;
    return (
        <Box
            sx={{
                borderRadius: '10px',
                backgroundColor: Theme.COLOR.PRIMARY
            }}
        >
            <Typography
                variant="h3"
                style={{
                    padding: '25px',
                    color: Theme.COLOR.TEXT_LIGHT,
                    textAlign: 'center'
                }}
            >
                {desc}
            </Typography>
        </Box>

    )
}

function PainPointsBox(props: any) {
    const { bullets, title } = props;
    return (
        <Box
            sx={{
                borderRadius: '5px',
                boxShadow: '5px 5px 5px rgba(255, 255, 255, 0.3)',
                backgroundColor: Theme.COLOR.BACKGROUND_LIGHT
            }}
        >
            <Typography
                variant="h6"
                style={{
                    padding: '25px',
                    textAlign: 'center'
                }}
            >
                {title}
            </Typography>
            <Stack direction="row">
                <List>
                    {
                        bullets.map((bullet: string) => {
                            return (
                                <ListItem
                                    key={bullet}
                                >
                                    <ListItemIcon>
                                        <IndeterminateCheckBox />
                                    </ListItemIcon>
                                    <ListItemText primary={bullet} />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Stack>
        </Box>

    )
}