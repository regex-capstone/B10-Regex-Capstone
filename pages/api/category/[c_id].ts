// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ApiEndpoint from '@/isaac/api/APIEndpoint';
import { NextApiRequest, NextApiResponse } from 'next'
import type API from '../../../isaac/api/APIInterface';
import { Category } from '@/isaac/models';

const api: API = ApiEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const query = req.query
    const c_id = query.c_id as string

    try {
        switch (method) {
            case 'GET':
                const category: Category = await api.getCategoryById(c_id);

                if (!category) {
                    throw new Error('Category not found.');
                }

                res.status(200).json({
                    success: true,
                    category: category
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
