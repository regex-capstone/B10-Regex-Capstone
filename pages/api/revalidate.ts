import { NextApiRequest, NextApiResponse } from 'next';

// @TODO: implement
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check for secret to confirm this is a valid request
    // @TODO: maybe make new secret token?
    const secret = req.query.secret;
    const slug = req.query.slug;
    const type = req.query.type;

    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        let validated = false;

        switch (type) {
            case RevalidateTypes.PROFILE:
                await res.revalidate(`/profile`);
                validated = true;
                break;
            default:
                await res.revalidate(`/${type}/${slug}`);
                validated = true;
                break;

        }
        return res.json({ revalidated: validated });
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}

export enum RevalidateTypes {
    PAGE = 'page',
    PROFILE = 'profile',
}