// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import '@/isaac/database/mongoose/MongooseProvider';
import API from '@/isaac/api/APIInterface';
import ApiEndpoint from '@/isaac/api/APIEndpoint';

const api: API = ApiEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const body = req.body;

    try {
        switch (method) {
            case 'GET':
                const allCategories = await api.getAllCategories();
                res.status(200).json(allCategories)
                break;
            case 'POST':
                if (!body) throw new Error('POST request has no body.');
                if (!body.name) throw new Error('POST request has no name.');
    
                const categoryId = await api.addNewCategory({
                    name: body.name
                });
                
                res.status(200).json({
                    success: true,
                    category_id: categoryId
                });
                
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST'])
                res.status(405).end(`Method ${method} Not Allowed`)
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
