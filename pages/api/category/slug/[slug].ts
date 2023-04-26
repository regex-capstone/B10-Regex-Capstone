// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { Category } from '@/isaac/models';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { GetCategoryTypes } from '@/isaac/public/api/Category';
import { SortType } from '@/isaac/public/SortType';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { 
        query: { slug }, 
        method 
    } = req;
    

    try {
        const category: Category = (
            await api.Category.get(GetCategoryTypes.CATEGORY_BY_SLUG, SortType.NONE, { c_slug: slug as string }
            ) as Category);

        if (!category) { throw new Error('Category not found.'); }

        switch (method) {
            case 'GET':
                res.status(200).json({
                    success: true,
                    payload: category
                });

                break;
            default:
                res.setHeader('Allow', ['GET']);
                res.status(405).send(`Method ${method} Not Allowed`);
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
