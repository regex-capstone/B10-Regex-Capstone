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
            case 'PUT':
                if (!body) throw new Error('PUT request has no body.');

                const userId = await api.updateUser(body);

                res.status(200).json({
                    success: true,
                    user_id: userId
                });
                
                break;
            default:
                res.setHeader('Allow', ['PUT'])
                res.status(405).end(`Method ${method} Not Allowed`)
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
