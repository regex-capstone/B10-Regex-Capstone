import { Box, Divider, Grid, Typography } from "@mui/material";
import { ABOUT_JSON } from "./content";

export default function Stakeholders() {
    const CONTENT = ABOUT_JSON;

    return (
        <Box
            style={{
            }}
        >
            <Typography
                variant="h6"
                style={{
                    textAlign: 'center',
                    marginLeft: 300,
                    marginRight: 300
                }}
            >
                {CONTENT.stakeholders.introduction}
            </Typography>
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

const advisers = {
    title: 'iSchool Advising Team',
    members: [
        {
            name: 'Dowell Eugenio',
            role: 'iSchool Adviser',
            picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
        {
            name: 'Elisa Tran',
            role: 'iSchool Adviser',
            picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
        {
            name: 'Matt Trease',
            role: 'iSchool Adviser',
            picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        },
        {
            name: 'Kathy Mitchell',
            role: 'iSchool Adviser',
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
// TODO maybe make accordion?
function Advisers() {
    return (
        <>
            <Typography
                variant="h4"
                style={{
                    textAlign: 'center',
                    padding: '50px'
                }}
            >
                {advisers.title}
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