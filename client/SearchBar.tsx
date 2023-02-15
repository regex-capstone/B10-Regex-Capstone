import { Button, Stack, TextField } from "@mui/material";
import Search from "@/client/Search";

export default function SearchBar(props: { query: string | string[] | undefined }) {
  const { query } = props;
  return (
    <Stack direction={'row'} spacing={2} sx={{
      paddingTop: 2,
      paddingBottom: 2,
      alignItems: 'stretch',
      justifyContent: 'start'
    }}>
      <TextField value={query} sx={{
        flexGrow: 1,
      }} />
      <Button variant="contained" onClick={Search}>Search</Button>
    </Stack>
  )
}