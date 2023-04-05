// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ApiEndpoint from '@/isaac/api/APIEndpoint';
import { NextApiRequest, NextApiResponse } from 'next'
import type API from '../../../../isaac/api/APIInterface';
import Page from '../../../../isaac/models/Page';

const api: API = ApiEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const query = req.query
    const page_title = query.page_title as string

    try {
        const page: Page = await api.getPageByTitle(page_title);

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
            if (!page) {
                throw new Error('Page not found.');
            }
            const deleted = await api.deletePage(page.id as string);
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
