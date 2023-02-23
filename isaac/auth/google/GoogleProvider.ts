import GoogleProvider from 'next-auth/providers/google';

const GoogleProviderOptions = {
    clientId: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_SECRET as string
}

export default GoogleProvider(GoogleProviderOptions);
