import { Box, Button, Input, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import Theme from "./Theme";
import SearchIcon from '@mui/icons-material/Search';
import InputUnstyled from '@mui/base/InputUnstyled';


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
    <Stack direction="row" sx={{
      paddingTop: 2,
      paddingBottom: 2,
      alignItems: 'stretch',
      justifyContent: 'start',
    }}>
      <SearchField value={query} onChange={(e) => setQuery(e.target.value)} />
      <Link href={`/search?q=${query}`} passHref style={{
        textDecoration: 'none',
        color: Theme.COLOR.TEXT_DARK
      }}>
        <Box
          sx={{
            backgroundColor: Theme.COLOR.TEXT_DARK,
            flexGrow: 1,
            paddingLeft: '1rem',
            paddingRight: '1rem',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SearchIcon sx={{
            color: Theme.COLOR.TEXT_LIGHT,
          }} />
        </Box>
      </Link>
    </Stack>
  )
}

function SearchField(props: { value: string, onChange: (e: any) => void }) {
  return (
    <TextField
      value={props.value}
      onChange={props.onChange}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: Theme.COLOR.TEXT_DARK,
          },
          '&:hover fieldset': {
            borderColor: Theme.COLOR.TEXT_DARK,
          },
          '&.Mui-focused fieldset': {
            borderColor: Theme.COLOR.TEXT_DARK,
            border: '1px solid',
          },
          borderRadius: 0,
        },
      }}
    />
  )
}