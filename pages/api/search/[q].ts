// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import '@/isaac/database/mongoose/MongooseProvider';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { 
        query: { q }, 
        method 
    } = req;

    try {
        switch (method) {
            case 'GET':
                if (!q) throw new Error('No query provided.');

                const results = await api.Search.search(q as string);

                // add search query metric
                await api.MetricSearchQuery.add({
                    search_query: q as string,
                });

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
