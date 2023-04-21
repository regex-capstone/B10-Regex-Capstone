// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import '@/isaac/database/mongoose/MongooseProvider';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const query: string = req.query.q as string;

    try {
        switch (method) {
        case 'GET':
            if (!query) throw new Error('No query provided.');

            const results = await api.Search.search(query);

            res.status(200).json({
                success: true,
                payload: results
            });
            break;
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
