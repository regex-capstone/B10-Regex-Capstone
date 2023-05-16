import Header from "@/client/Header";
import Theme from "@/client/Theme";
import { User } from "@/isaac/models";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const API_ENDPOINT_USER = `/api/user`

export default function Admin() {
  const router = useRouter()
  const { data: session } = useSession()
  const [admins, setAdmins] = useState<User[]>([])

  // TODO: Get all admins 
  useEffect(() => {
    fetch(API_ENDPOINT_USER)
      .then(res => res.json())
      .then(users => {
        setAdmins(users.payload as User[])
      })
  }, [setAdmins])

  if (!session) {
    return "Unauthorized"
  }

  return (
    <>
      <Head>
        <title>Admin Management</title>
      </Head>
      <Header />
      <Container maxWidth="md">
        <Typography sx={{
          marginTop: "1em",
          fontSize: "2em",
          fontWeight: "bold",
        }}>
          Administrators
        </Typography>
        <hr />
        <Stack direction="column" spacing={2}>
          {
            admins.map(admin => <AdminUser key={admin.email} user={admin} />)
          }
          <AddAdmin />
        </Stack>
      </Container>
    </>
  )
}

function AdminUser(props: { user: User }) {
  const router = useRouter()
  const { user } = props

  const handleRemove = async () => {
    const res = await fetch(API_ENDPOINT_USER, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user.email })
    })

    if (res.ok) router.reload()
    else window.alert(`Failed to remove ${user.email}: ${res.statusText}`)
  }

  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <Typography>{user.email}</Typography>
      <Button variant="contained" onClick={handleRemove}>Remove</Button>
    </Stack>
  )
}

function AddAdmin() {
  const router = useRouter()
  const [value, setValue] = useState('')

  const handleAdd = async () => {
    const res = await fetch(API_ENDPOINT_USER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: value })
    })

    if (res.ok) router.reload()
    else window.alert(`Failed to add ${value}: ${res.statusText}`)
  }

  return (
    <Stack direction="row" spacing={2}>
      <TextField value={value} onChange={(e) => setValue(e.target.value)} />
      <Button variant="contained" onClick={handleAdd}>Add</Button>
    </Stack>
  )
}