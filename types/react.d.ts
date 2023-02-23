import { ComponentAuthOptions } from '../isaac/auth/deprecated/AuthOptions';

declare module "react" {
    interface ComponentClass {
        auth: ComponentAuthOptions
    }

    interface FunctionComponent {
        auth: ComponentAuthOptions
    }
}