import { ABOUT_JSON } from "./content";
import { Box, Grid, Typography } from "@mui/material";
import {AnimationOnScroll} from 'react-animation-on-scroll';

export default function How() {
    const CONTENT = ABOUT_JSON.how;

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
                    CONTENT.title
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
                    CONTENT.subtitle
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
                        CONTENT.team.map((member) => {
                            return (
                                <AnimationOnScroll animateIn="animate__fadeInLeftBig">
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
                                </AnimationOnScroll>
                            )
                        })
                    }
                </Grid>
            </Grid>
            <Typography
                variant="h5"
                style={{
                    marginLeft: 300,
                    marginRight: 300,
                    opacity: '0.7',
                    paddingBottom: '50px'
                }}
            >
                {
                    CONTENT.introduction
                }
            </Typography>
        </>
    )
}