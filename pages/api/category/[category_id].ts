// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { Category, Page } from '@/isaac/models';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import PublicAPIEndpoint, { SortType } from '@/isaac/public/PublicAPI';
import { GetPageTypes } from '@/isaac/public/api/Page';
import { GetCategoryTypes } from '@/isaac/public/api/Category';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, AuthOptions);
    const method = req.method
    const query = req.query
    const category_id = query.category_id as string

    try {
        const category: Category = (
            await api.Category.get(GetCategoryTypes.CATEGORY_BY_ID, SortType.NONE, { c_id: category_id }
        ) as Category);

        if (!category) { throw new Error('Category not found.'); }

        switch (method) {
            case 'GET':
                res.status(200).json({
                    success: true,
                    payload: category
                });
                    
                break;
            case 'DELETE':
                if (!session) throw new Error('You must be logged in.');

                // delete all pages under the selected category
                const pages = (
                    await api.Page.get(GetPageTypes.PAGES_BY_CATEGORY_ID, SortType.NONE, { c_id: category.id as string }) as Page[]
                );

                for (const page of pages) {
                    await api.Page.delete(page.id as string);
                }

                const success = await api.Category.delete(category_id);

                res.status(200).json({
                    success: success
                });
                break;
            default:
                res.setHeader('Allow', ['GET', 'DELETE']);
                res.status(405).send(`Method ${method} Not Allowed`);
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
