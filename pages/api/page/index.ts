// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import '@/isaac/database/mongoose/MongooseProvider';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { GetPageTypes } from '@/isaac/public/api/Page';
import Page, { ClientPageRequest } from '@/isaac/models/Page';
import { ClientRevisionRequest } from '@/isaac/models/Revision';
import { parseSortType } from '@/isaac/public/SortType';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, AuthOptions);
    const { 
        query: { sort_type: raw_sort_type, populate: populate_string, limit }, 
        body,
        method
    } = req;
    const sort_type = parseSortType(raw_sort_type as string);
    const populate: boolean = (populate_string) ? (populate_string as string).toLowerCase() === 'true' : false;

    try {
        switch (method) {
            case 'GET':
                const pages: Page[] = (
                    await api.Page.get(
                        GetPageTypes.ALL_PAGES, sort_type, 
                        { 
                            populate: populate
                        }
                    ) as Page[]
                );

                const payload = pages.splice(0, limit ? parseInt(limit as string) : pages.length);

                res.status(200).json({
                    success: true,
                    payload: payload
                });
                break;
            case 'POST':
                if (!session) throw new Error('You must be logged in.');

                if (!body) throw new Error('POST request has no body.');
                if (!body.title) throw new Error('POST request has no title.');

                const clientRequest: ClientPageRequest = {
                    title: body.title
                }
                
                if (body.category) clientRequest.category = body.category;

                const page = await api.Page.add(clientRequest);

                // initialize revision for the new page
                const initRevisionRequest: ClientRevisionRequest = {
                    content: '<>',
                    page: page.id as string
                }

                await api.Revision.add(initRevisionRequest);

                res.status(200).json({
                    success: true,
                    payload: page
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
