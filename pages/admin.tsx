import Header from "@/client/Header";
import Theme from "@/client/Theme";
import { User } from "@/isaac/models";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Admin() {
  const { data: session } = useSession()
  const [admins, setAdmins] = useState<User[]>([])

  // TODO: Get all admins 
  useEffect(() => {
    // fetch(...)
    const testUser: User = {
      email: 'admin@ischool.edu',
      created_at: 0,
    }
    setAdmins([testUser, testUser, testUser])
  })

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
            admins.map(admin => <AdminUser user={admin} />)
          }
          <AddAdmin />
        </Stack>
      </Container>
    </>
  )
}

function AdminUser(props: { user: User }) {
  const { user } = props

  const handleRemove = async () => {
    // TODO: Call remove API
    window.alert(`remove ${user.email}`)
  }

  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <Typography>{user.email}</Typography>
      <Button variant="contained" onClick={handleRemove}>Remove</Button>
    </Stack>
  )
}

function AddAdmin() {
  const [value, setValue] = useState('')

  const handleAdd = async () => {
    // TODO: Call add API
    window.alert(`add ${value}`)
  }

  return (
    <Stack direction="row" spacing={2}>
      <TextField value={value} onChange={(e) => setValue(e.target.value)} />
      <Button variant="contained" onClick={handleAdd}>Add</Button>
    </Stack>
  )
}