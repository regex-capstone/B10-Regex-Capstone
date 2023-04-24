// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { GetRevisionTypes } from '@/isaac/public/api/Revision';
import { Revision } from '@/isaac/models';
import { SortType } from '@/isaac/public/SortType';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { 
        query: { slug, populate: populate_string }, 
        method,
        body
    } = req;
    const populate: boolean = (populate_string) ? (populate_string as string).toLowerCase() === 'true' : false;

    try {
        switch (method) {
            case 'GET':
                const revision: Revision = (
                    await api.Revision.get(
                        GetRevisionTypes.REVISIONS_BY_PAGE_SLUG,
                        SortType.RECENTLY_CREATED,
                        { 
                            p_slug: slug as string,
                            populate: populate
                        }
                    ) as Revision[]
                )[0];

                if (!revision) { throw new Error('Revisions not found.'); }

                res.status(200).json({
                    success: true,
                    payload: revision
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
