// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import '@/isaac/database/mongoose/MongooseProvider';
import API from '@/isaac/api/APIInterface';
import ApiEndpoint from '@/isaac/api/APIEndpoint';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import { getServerSession } from 'next-auth';

const api: API = ApiEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, AuthOptions);
    const method = req.method
    const body = req.body;

    try {
        switch (method) {
        case 'GET':
            const allPages = await api.getAllPages();
            res.status(200).json(allPages)
            break
        case 'POST':
            // TODO: test
            if (!session) throw new Error('You must be logged in.');

            if (!body) throw new Error('POST request has no body.');
            if (!body.title) throw new Error('POST request has no title.');
            if (!body.page_category_id) throw new Error('POST request has no page_category_id.');
    
            const page = await api.addNewPage({
                title: body.title,
                page_category_id: body.page_category_id
            });
                
            res.status(200).json({
                success: true,
                page: page
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
