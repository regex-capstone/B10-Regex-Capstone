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
<<<<<<< HEAD
        case 'GET':
            res.status(200).json({
                success: true,
                categories: await api.getAllCategories()
            });
            
            break;
        case 'POST':
            if (!body) throw new Error('POST request has no body.');
            if (!body.name) throw new Error('POST request has no name.');
                
            res.status(200).json({
                success: true,
                category_id: await api.addNewCategory({
                    name: body.name
                })
            });
                
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
=======
            case 'GET':
                const categories = await api.Category.get(GetCategoryTypes.ALL_CATEGORIES, sort_type);

                res.status(200).json({
                    success: true,
                    payload: categories
                });

                break;
            case 'POST':
                if (!session) throw new Error('You must be logged in.');                
                if (!body) throw new Error('POST request has no body.');
                const data = JSON.parse(body);
                if (!data.name) throw new Error('POST request has no name.');

                const existingCat = (
                    await api.Category.get(GetCategoryTypes.CATEGORY_BY_NAME, SortType.NONE, { c_name: data.name }) as Category
                );

                if (existingCat) throw new Error('Category already exists.');

                const clientRequest: ClientCategoryRequest = {
                    name: data.name
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
>>>>>>> parent of 14ef6ee (fixed add category bug)
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
