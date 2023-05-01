import { Box, Grid, Typography } from "@mui/material";
import { ABOUT_JSON } from "./content";

export default function Why() {
    const CONTENT = ABOUT_JSON;

    return (
        <>
            <Box sx={{ 
                flexGrow: 1, 
                minHeight: '400px',
                backgroundColor: '#d2bc86',
            }}>
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
                    {CONTENT.why.features.map((item) => (
                        <Grid
                            item
                            xs={12}
                            md={4}
                            minHeight={300}
                            key={item.text}
                            style={{
                                textAlign: 'center',
                                padding: '70px',
                                borderRadius: '10px',
                                margin: '10px !important',
                            }}
                        >
                            <img 
                                src={item.icon}
                                style={{
                                    width: '150px'
                                }}
                            />
                            <Typography>{item.text}</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}