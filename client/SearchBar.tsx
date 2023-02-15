import { Button, Stack, TextField } from "@mui/material";

export default function SearchBar(props: { query: string | string[] | undefined }) {
  const { query } = props;
  return (
    <Stack direction={'row'} spacing={2}>
      <TextField value={query} />
      <Button variant="contained">Search</Button>
    </Stack>
  )
}