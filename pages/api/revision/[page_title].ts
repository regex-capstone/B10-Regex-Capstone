// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ApiEndpoint from '@/isaac/api/APIEndpoint';
import { NextApiRequest, NextApiResponse } from 'next'
import type API from '../../../isaac/api/APIInterface';
import Revision from '../../../isaac/models/Revision';

const api: API = ApiEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const query = req.query
    const page_title = query.page_title as string

    try {
        switch (method) {
        case 'GET':
            const rev: Revision = await api.getRecentPageRevisionByName(page_title);

            if (!rev) {
                throw new Error('Revision not found.');
            }

            res.status(200).json({
                success: true,
                revision: rev
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
