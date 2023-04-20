// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SortType } from '@/isaac/public/PublicAPI';
import { NextApiRequest, NextApiResponse } from 'next'
import Page from '../../../../isaac/models/Page';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import { getServerSession } from 'next-auth';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { GetPageTypes } from '@/isaac/public/api/Page';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, AuthOptions);
    const method = req.method
    const query = req.query
    const slug = query.slug as string

    try {
        const page: Page = await api.Page.get(GetPageTypes.PAGE_BY_SLUG, SortType.NONE, { p_slug: slug }) as Page;

        if (!page) {
            throw new Error('Page not found.');
        }

        switch (method) {
        case 'GET':
            res.status(200).json({
                success: true,
                page: page
            });
            break;
        case 'DELETE':
            if (!session) throw new Error('You must be logged in.');
            
            const deleted = await api.Page.delete(page.id as string);
            res.status(200).json({
                success: true,
                page: deleted
            });
            break;
        default:
            res.setHeader('Allow', ['GET, DELETE'])
            res.status(405).send(`Method ${method} Not Allowed`)
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
