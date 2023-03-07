import { NextApiRequest, NextApiResponse } from 'next';

// @TODO: implement
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check for secret to confirm this is a valid request
    const secret = req.query.secret;
    const path = req.query.path;

    if (secret !== process.env.NEXT_PUBLIC_REVALIDATION_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        await res.revalidate(path as string)
        return res.json({
            revalidated: true,
            path: path
        })
    } catch (err: any) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send(`Error revalidating: ${err.message}`)
    }
}