import { Button, Stack, TextField } from "@mui/material";
import natural from "natural";

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