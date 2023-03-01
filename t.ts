// import { withAuth } from "next-auth/middleware";
// import ApiEndpoint from "./isaac/api/APIEndpoint";
// import API from "./isaac/api/APIInterface";
// import { User } from "./isaac/models";
// import { UserRole } from "./isaac/models/User";

// const restrictedPrefix = 'admin';

// export default withAuth({
//     secret: process.env.AUTH_SECRET,
//     callbacks: {
//         authorized({ req, token }) {
//             // @TODO figure out how to redirect.
//             // `/admin` requires admin role
//             if (req.nextUrl.pathname.split('/')[1] === restrictedPrefix) {
//                 const user: User = token?.user as User;

//                 console.log(user.role === UserRole.ADMIN);

//                 return user.role === UserRole.ADMIN;
//             }

//             return !!token
//         },
//     },
// });

// // export const config = { matcher: ["/not_authorized_test"] };