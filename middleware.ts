import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized({ req, token }) {
        // console.log(req.nextUrl);
        // console.log(token);
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        return token?.userRole === "admin"
      }
      // `/me` only requires the user to be logged in
      return !!token
    },
  },
});

// export const config = { matcher: ["/not_authorized_test"] };