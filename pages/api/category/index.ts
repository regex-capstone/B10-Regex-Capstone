// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import '@/isaac/database/mongoose/MongooseProvider';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import { Category } from '@/isaac/models';
import PublicAPIEndpoint, { SortType } from '@/isaac/public/PublicAPI';
import { GetCategoryTypes } from '@/isaac/public/api/Category';
import { ClientCategoryRequest } from '@/isaac/models/Category';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, AuthOptions);
    const method = req.method
    const body = req.body;

    try {
        switch (method) {
            case 'GET':
                const categories = await api.Category.get(GetCategoryTypes.ALL_CATEGORIES, SortType.ALPHABETICAL);

                res.status(200).json({
                    success: true,
                    payload: categories
                });
                
                break;
            case 'POST':
                if (!session) throw new Error('You must be logged in.');
                
                if (!body) throw new Error('POST request has no body.');
                if (!body.name) throw new Error('POST request has no name.');

                const existingCat = (await api.Category.get(
                    GetCategoryTypes.CATEGORY_BY_NAME, 
                    SortType.ALPHABETICAL, 
                    { c_name: body.name }
                ) as Category);

                if (existingCat) throw new Error('Category already exists.');

                const clientRequest: ClientCategoryRequest = {
                    name: body.name
                }

                const category = await api.Category.add(clientRequest);
                    
                res.status(200).json({
                    success: true,
                    payload: category
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
