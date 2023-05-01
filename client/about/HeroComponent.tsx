import { Box, Button, Grid, Typography } from "@mui/material";
import { ABOUT_JSON } from "./content";


export default function Hero() {
    const CONTENT = ABOUT_JSON;

    return (
        <Box
            style={{
                width: '100%',
                display: 'flex',
                minHeight: '600px',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5'
            }}
        >
            <Grid
                container
                spacing={6}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: '1300px',
                    padding: '50px',
                }}
            >
                <Grid item xs={12} md={7}>
                    <Typography 
                        variant="h3"
                        style={{
                            paddingBottom: '15px'
                        }}
                    >
                        { CONTENT.hero.title }
                    </Typography>
                    <Typography 
                        variant="h6"
                        style={{
                            opacity: '0.4',
                            paddingBottom: '30px',
                        }}
                    >
                        { CONTENT.hero.subtitle }
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: '200px', fontSize: '16px' }}
                    >
                        { CONTENT.hero.button }
                    </Button>
                </Grid>
                <Grid item xs={12} md={5}>
                    <img 
                        src={'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mary_Gates_Hall%2C_April_2008.jpg/1280px-Mary_Gates_Hall%2C_April_2008.jpg'} 
                        alt="My Team"
                        style={{
                            width: '100%'
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};