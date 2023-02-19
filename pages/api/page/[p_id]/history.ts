// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ApiEndpoint from '@/isaac/api/APIEndpoint';
import { NextApiRequest, NextApiResponse } from 'next'
import type API from '../../../../isaac/api/APIInterface';
import Page from '../../../../isaac/models/Page';
import Revision from '../../../../isaac/models/Revision';

const api: API = ApiEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const query = req.query
    const p_id = query.p_id as string

    try {
        switch (method) {
            case 'GET':
                const page: Page = await api.getPageById(p_id);

                if (!page) {
                    throw new Error('Page not found.');
                }

                const revs: Revision[] = await api.getAllPageRevisionsById(p_id);

                if (!revs) {
                    throw new Error('Page has no revision content.');
                }

                res.status(200).json({
                    success: true,
                    revision: revs
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
