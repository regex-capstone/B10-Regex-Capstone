import { ABOUT_JSON } from "./content";
import { Box, Grid, Typography } from "@mui/material";

export default function Who() {
    const CONTENT = ABOUT_JSON;

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
                    CONTENT.who.title
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
                    CONTENT.who.subtitle
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
                        CONTENT.who.team.map((member) => {
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
            </Grid>
        </>
    )
}