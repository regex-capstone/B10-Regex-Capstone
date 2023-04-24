// import { Container, Stack, Avatar, Button, Select, MenuItem, Link, InputLabel, FormControl } from "@mui/material";
// import Grid2 from '@mui/material/Unstable_Grid2';
// import Head from "next/head";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import User from '../isaac/models/User';
// import { useRouter } from "next/router";
// import useUser from "@/hooks/useUser";
// import LoadingSpinner from "@/client/LoadingSpinner";

// // TODO take out
// export default function ProfilePage() {
//     const router = useRouter();

//     const { data: sessionData } = useSession();
//     // const { data: userData } = useUser();

//     const [user, setUser] = useState<User>();
//     const [profileImage, setProfileImage] = useState<string>();
//     const [saving, setSaving] = useState(false);

//     useEffect(() => {
//         if (userData) {
//             setUser(userData);
//         }
//     }, [userData])

//     useEffect(() => {
//         if (sessionData) {
//             if (sessionData.user) {
//                 setProfileImage(sessionData.user.image as string);
//             }
//         }
//     }, [sessionData]);

//     const handleStandingChange = (e: any) => {
//         setUser((prev: User | undefined) => {
//             if (prev) {
//                 return {
//                     ...prev,
//                     standing: e.target.value
//                 }
//             }
//         });
//     }

//     const handleMajorChange = (e: any) => {
//         setUser((prev: User | undefined) => {
//             if (prev) {
//                 return {
//                     ...prev,
//                     major: e.target.value
//                 }
//             }
//         });
//     }

//     const handleSave = async () => {
//         try {
//             if (!user) throw new Error('No user to save!');
            
//             setSaving(true);

//             const userRequest: User = {
//                 ...user
//             }

//             if (userRequest !== user) {
//                 // saveUser(userRequest);
//             }
            
//             setSaving(false);
//             router.push('/');
//         } catch (err) {
//             /* eslint-disable */
//             // TODO: Replace with a proper error handling system
//             console.error(err);
//         }
//     }

//     if (!user) return (<LoadingSpinner />);

//     return (
//         <>
//             <Head>
//                 <title>{`Profile Page | ISAAC`}</title>
//             </Head>

//             <Container>
//                 <Grid2 container spacing={2}>
//                     <Grid2 xs>
//                         <Stack direction={'column'} spacing={2} sx={{ width: 1 }}>
//                             <Stack direction={'row'} spacing={2} sx={{
//                                 width: 1,
//                                 justifyContent: 'center',
//                                 alignItems: 'center'
//                             }}>
//                                 <Avatar alt="<username>" src={profileImage} sx={{
//                                     width: 150,
//                                     height: 150,
//                                 }}></Avatar>
//                                 <h1>{user.name}</h1>
//                                 <h1>{user.role.toUpperCase()}</h1>
//                             </Stack>
//                             <h2>Academic Information</h2>
//                             <Stack direction={'column'} spacing={3} sx={{
//                                 paddingLeft: 10
//                             }}>
//                                 <FormControl fullWidth>
//                                     <InputLabel id="class-standing-label">Class Standing</InputLabel>
//                                     <Select
//                                         labelId="class-standing-label"
//                                         value={user.standing}
//                                         label="Class Standing"
//                                         onChange={handleStandingChange}
//                                     >

//                                         {
//                                             Object.keys(UserStanding).map(s => {
//                                                 const value = (UserStanding as any)[s];
//                                                 return <MenuItem key={value} value={value}>{s}</MenuItem>
//                                             })
//                                         }
//                                     </Select>
//                                 </FormControl>
//                                 <FormControl fullWidth>
//                                     <InputLabel id="major-status-label">Major Status</InputLabel>
//                                     <Select
//                                         labelId="major-status-label"
//                                         value={user.major}
//                                         label="Class Standing"
//                                         onChange={handleMajorChange}
//                                     >
//                                         {
//                                             Object.keys(UserMajor).map(s => {
//                                                 const value = (UserMajor as any)[s];
//                                                 return <MenuItem key={value} value={value}>{s}</MenuItem>
//                                             })
//                                         }
//                                     </Select>
//                                 </FormControl>
//                             </Stack>
//                             <Stack direction={'column'} spacing={3} sx={{
//                                 justifyContent: 'center',
//                                 alignItems: 'center'
//                             }}>
//                                 <Stack direction={'row'} spacing={2}>
//                                     {
//                                         saving
//                                             ? <p>Saving...</p>
//                                             : <Button sx={{
//                                                 width: "fit-content"
//                                             }} onClick={handleSave}>Save Changes</Button>
//                                     }
//                                     <Button sx={{
//                                         width: "fit-content"
//                                     }}>
//                                         <Link href="/">Return to Home Page</Link>
//                                     </Button>
//                                 </Stack>
//                             </Stack>
//                         </Stack>
//                     </Grid2>
//                 </Grid2>
//             </Container>
//         </>
//     )
// }