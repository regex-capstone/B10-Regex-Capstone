import { Button, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export interface SearchBarProps {
  initialQuery?: string
}

export default function SearchBar(props: SearchBarProps) {
  const { initialQuery } = props;
  const [query, setQuery] = useState<string>(initialQuery ?? "");

  // on Search, redirect to /search?q=query
  const onSearch = () => {
    window.location.href = `/search?q=${query}`

  }

  return (
    <Stack direction="row" spacing={2} sx={{
      paddingTop: 2,
      paddingBottom: 2,
      alignItems: 'stretch',
      justifyContent: 'start',
    }}>
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Search"
        sx={{
          flexGrow: 1
        }}
      />
      <Link href={`/search?q=${query}`} passHref>
        <Button
          variant="contained"
          sx={{
            flexGrow: 1
          }}
        >
          Search
        </Button>
      </Link>
    </Stack>
  )
}