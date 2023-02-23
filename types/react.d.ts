import { ComponentAuthOptions } from '../isaac/auth/next-auth/AuthOptions';

declare module "react" {
    interface ComponentClass {
        auth: ComponentAuthOptions
    }

    interface FunctionComponent {
        auth: ComponentAuthOptions
    }
}