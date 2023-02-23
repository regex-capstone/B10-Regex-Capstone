import { ComponentAuthOptions } from "@/isaac/auth/deprecated/AuthOptions";

declare module "next/app" {
    interface NextPageContext {
        auth: ComponentAuthOptions
    }
}