// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import PublicAPIEndpoint, { SortType } from '@/isaac/public/PublicAPI';
import { GetRevisionTypes } from '@/isaac/public/api/Revision';
import { Revision } from '@/isaac/models';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const query = req.query
    const slug = query.slug as string

    try {
        switch (method) {
        case 'GET':
            const revision: Revision = (
                await api.Revision.get(GetRevisionTypes.REVISIONS_BY_PAGE_SLUG, SortType.RECENTLY_CREATED, { p_slug: slug }) as Revision[]
            )[0];

            if (!revision) { throw new Error('Revisions not found.'); }

            res.status(200).json({
                success: true,
                revision: revision
            });
                
            break;
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).send(`Method ${method} Not Allowed`)
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
