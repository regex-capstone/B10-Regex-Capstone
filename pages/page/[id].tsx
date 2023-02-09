import { useRouter } from "next/router";

/* (root)/page/[id] */
export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <h1>Page {id}</h1>
  )
}