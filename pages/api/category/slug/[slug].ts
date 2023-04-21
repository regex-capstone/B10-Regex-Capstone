// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { Category } from '@/isaac/models';
import PublicAPIEndpoint, { SortType } from '@/isaac/public/PublicAPI';
import { GetCategoryTypes } from '@/isaac/public/api/Category';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const query = req.query
    const slug = query.slug as string

    try {
        const category: Category = (
            await api.Category.get(GetCategoryTypes.CATEGORY_BY_SLUG, SortType.NONE, { c_slug: slug }
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
