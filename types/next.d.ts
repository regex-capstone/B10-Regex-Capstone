import { ComponentAuthOptions } from "@/isaac/auth/next-auth/AuthOptions";

declare module "next/app" {
    interface NextPageContext {
        auth: ComponentAuthOptions
    }
}