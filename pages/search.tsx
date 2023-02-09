import { useRouter } from 'next/router';

/* (root)/search */
export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  return (
    <>
      <h1>Search</h1>
      <p>Query: {q}</p>
    </>
  )
}