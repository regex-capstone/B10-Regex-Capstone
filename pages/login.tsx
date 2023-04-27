import { signIn } from "next-auth/react"
import { useEffect } from "react"

export default function Login() {
    useEffect(() => {
        signIn(undefined, { callbackUrl: '/' });
    })
    return (
        <>Redirecting to login...</>
    )
}