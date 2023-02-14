import { Button, Container, Divider, Stack, TextField, Typography } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'

/* (root)/ */
export default function Index() {
  const categories = [
    "Academic Planning",
    "Academic Support",
    "Advising",
    "Career Planning",
    "Financial Aid",
    "Financial Planning",
    "Health & Wellness",
    "Housing",
  ]

  return (
    <Container>
      <Stack spacing={2}>
        <Container sx={{
          textAlign: "center",
        }}>
          <h1>ISAAC</h1>
          <p>Informatics Student Advising Automation Complex</p>
          <Stack direction="row" spacing={2} sx={{
            justifyContent: "center",
          }}>
            <TextField />
            <Button variant="contained">Search</Button>
          </Stack>
        </Container>
        <Divider />
        <Container>
          <Grid2 container>
            {categories.map((category, i) => (
              <Grid2 key={i} xs={6}>
                <a href="#">{category}</a>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Stack>
    </Container>
  )
}