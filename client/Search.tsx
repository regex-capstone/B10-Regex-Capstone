import natural from "natural";

export default function Search() {
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

    tfidf.tfidfs('fox', function(i, measure) {
        console.log('document #' + i + ' is ' + measure);
    });
}