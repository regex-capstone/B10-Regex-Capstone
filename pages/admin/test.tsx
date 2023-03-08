import { UserRole } from '@/isaac/models/User';

export default function NotAuthorizedTest() {
    return (
        <h1>This is a protected page</h1>
    )
}

/**
 * Set the auth options for pages using this method
 */
NotAuthorizedTest.auth = {
    role: UserRole.ADMIN
};

/**
 * This is the server-side version of the auth options
 */
// export default async (req, res) => {
//   const session = await getServerSession(req, res, authOptions)

//   if (session) {
//     res.send({
//       content:
//         "This is protected content. You can access this content because you are signed in.",
//     })
//   } else {
//     res.send({
//       error: "You must be signed in to view the protected content on this page.",
//     })
//   }
// }