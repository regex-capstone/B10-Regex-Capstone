// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import MongooseModels from '@/isaac/database/mongoose/MongooseModels';
import '@/isaac/database/mongoose/MongooseProvider';
import API from '@/isaac/api/APIInterface';
import ApiEndpoint from '@/isaac/api/APIEndpoint';

const api: API = ApiEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const body = req.body;

    try {
        switch (method) {
            case 'POST':
                if (!body) throw new Error('POST request has no body.');

                const p_id = body.p_id;
                const content = body.content

                const revId = await api.updateLatestPageRevision(p_id, content);

                res.status(200).json({
                    success: true,
                    rev_id: revId
                });
                break;
            default:
                res.setHeader('Allow', ['POST'])
                res.status(405).end(`Method ${method} Not Allowed`)
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
