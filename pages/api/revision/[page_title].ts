// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const query = req.query
    const page_title = query.page_title as string

    try {
        switch (method) {
        case 'GET':
            // TODO: change to page slugs
            // const rev: Revision = await api.Revision.get(
            //     GetRevisionTypes.
            //     { p_title: page_title }
            // );

            // if (!rev) {
            //     throw new Error('Revision not found.');
            // }

            // res.status(200).json({
            //     success: true,
            //     revision: rev
            // });
                
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
