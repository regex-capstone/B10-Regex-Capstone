import { Button, Stack, TextField } from "@mui/material";
import natural from "natural";
import Link from "next/link";
import { useState } from "react";

export interface SearchBarProps {
  initialQuery?: string
}

export default function SearchBar(props: SearchBarProps) {
  const { initialQuery } = props;
  const [query, setQuery] = useState<string>(initialQuery ?? "")

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

function Search() {
    let testStrings = [    // create array of test strings to search
        "the quick brown fox jumps over the lazy dog",
        "here is how to request a course substitution",
        "test test test",
        "substitution is a funny word",
        "fox is the best character in super smash brothers melee",
        "hello world"
    ]

    let tfidf = new natural.TfIdf;  //init

    for(let i = 0; i < testStrings.length; i++) {
        tfidf.addDocument(testStrings[i]);
    }

    tfidf.tfidfs('fox and dog', function(i, measure) {
        console.log('document #' + i + ' is ' + measure);
    });
}