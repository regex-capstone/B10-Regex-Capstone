// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import '@/isaac/database/mongoose/MongooseProvider';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import { Category } from '@/isaac/models';
import PublicAPIEndpoint, { SortType } from '@/isaac/public/PublicAPI';
import { GetCategoryTypes } from '@/isaac/public/api/Category';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, AuthOptions);
    const method = req.method
    const body = req.body;

    try {
        switch (method) {
        case 'GET':
            res.status(200).json({
                success: true,
                categories: (await api.Category.get(GetCategoryTypes.ALL_CATEGORIES, SortType.ALPHABETICAL) as Category[])
            });
            
            break;
        case 'POST':
            if (!session) throw new Error('You must be logged in.');
            
            if (!body) throw new Error('POST request has no body.');
            if (!body.name) throw new Error('POST request has no name.');
                
            res.status(200).json({
                success: true,
                category_id: await api.Category.add({
                    name: body.name
                })
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
