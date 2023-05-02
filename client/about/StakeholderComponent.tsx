import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Typography } from "@mui/material";
import { ABOUT_JSON } from "./content";
import { ExpandMore } from "@mui/icons-material";

export default function Stakeholders() {
    const CONTENT = ABOUT_JSON;

    return (
        <Box
            style={{
                backgroundColor: '#f5f5f5'
            }}
        >
            {/* <Typography
                variant="h3"
                style={{
                    padding: '25px',
                    textAlign: 'center'
                }}
            >
                {CONTENT.stakeholders.title}
            </Typography> */}
            <Grid>
                <Box
                >
                    <Advisers />
                </Box>
                <Box
                    style={{
                        paddingBottom: '25px'
                    }}
                >
                    <Students />
                </Box>
                <Divider />
            </Grid>
        </Box>
    )
}

// TODO maybe make accordion?
function Advisers() {
    const CONTENT = ABOUT_JSON;

    return (
        <>
            <Typography
                variant="h4"
                style={{
                    textAlign: 'center',
                    padding: '50px'
                }}
            >
                {CONTENT.stakeholders.advisers.title}
            </Typography>
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
                    CONTENT.stakeholders.advisers.members.map((member) => {
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
                                <Typography
                                    variant="h6"
                                    style={{
                                        textAlign: 'center',
                                        opacity: '0.6'
                                    }}
                                >
                                    {
                                        member.role
                                    }
                                </Typography>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Grid>
                <Typography
                    variant="h4"
                    style={{
                        marginLeft: 300,
                        paddingTop: '25px',
                        paddingBottom: '25px'
                    }}
                >
                    {CONTENT.stakeholders.advisers.title_2}
                </Typography>
                <Typography
                    variant="h6"
                    style={{
                        marginLeft: 350,
                        marginRight: 300
                    }}
                >
                    {
                        CONTENT.stakeholders.advisers.aspects.map((aspect) => {
                            return (
                                <li>{aspect}</li>
                            )
                        })
                    }
                </Typography>
            </Grid>
        </>
    )
}

function Students() {
    const CONTENT = ABOUT_JSON;

    return (
        <>
            <Typography
                variant="h4"
                style={{
                    textAlign: 'center',
                    padding: '50px'
                }}
            >
                {CONTENT.stakeholders.students.title}
            </Typography>
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
                    CONTENT.stakeholders.students.members.map((member) => {
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
                                <Typography
                                    variant="h6"
                                    style={{
                                        textAlign: 'center',
                                        opacity: '0.6'
                                    }}
                                >
                                    {
                                        member.role
                                    }
                                </Typography>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Grid>
                <Typography
                    variant="h4"
                    style={{
                        marginLeft: 300,
                        paddingTop: '25px',
                        paddingBottom: '25px'
                    }}
                >
                    {CONTENT.stakeholders.students.title_2}
                </Typography>
                <Typography
                    variant="h6"
                    style={{
                        marginLeft: 350,
                        marginRight: 300
                    }}
                >
                    {
                        CONTENT.stakeholders.students.aspects.map((aspect) => {
                            return (
                                <li>{aspect}</li>
                            )
                        })
                    }
                </Typography>
            </Grid>
        </>
    )

}