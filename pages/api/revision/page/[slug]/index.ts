// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { GetRevisionTypes } from '@/isaac/public/api/Revision';
import { Page, Revision } from '@/isaac/models';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import { ClientRevisionRequest } from '@/isaac/models/Revision';
import { GetPageTypes } from '@/isaac/public/api/Page';
import { SortType } from '@/isaac/public/SortType';
import DOMPurify from 'isomorphic-dompurify';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, AuthOptions);
    const { 
        query: { slug, populate: populate_string }, 
        method,
        body
    } = req;
    const populate: boolean = (populate_string) ? (populate_string as string).toLowerCase() === 'true' : false;

    try {
        switch (method) {
            case 'GET':
                const revisions: Revision[] = (
                    await api.Revision.get(
                        GetRevisionTypes.REVISIONS_BY_PAGE_SLUG,
                        SortType.RECENTLY_CREATED,
                        { 
                            p_slug: slug as string,
                            populate: populate
                        }
                    ) as Revision[]
                );

                if (!revisions) { throw new Error('Revisions not found.'); }

                res.status(200).json({
                    success: true,
                    payload: revisions
                });

                break;
            case 'POST':
                if (!session) throw new Error('You must be logged in.');
                if (!body) throw new Error('POST request has no body.');
                if (!body.content) throw new Error('POST request has no content.');

                const page: Page = await api.Page.get(GetPageTypes.PAGE_BY_SLUG, SortType.NONE, { p_slug: slug as string }) as Page;

                if (!page) throw new Error('Page not found.');

                const clientRequest: ClientRevisionRequest = {
                    content: DOMPurify.sanitize(body.content),
                    page: page.id as string
                }

                const revision = await api.Revision.add(clientRequest);

                let text = '';

                for (let i = 0; i < 4; i++) {  // r/programminghorror
                    text += page.title + ' ';
                }

                text += revision.content
                    .replaceAll(/<[^>]*>/g, ' ')
                    .replaceAll(/\s{2,}/g, ' ')
                    .trim();
                    
                await api.Search.add(page.id as string, text);

                res.status(200).json({
                    success: true,
                    payload: revision
                });

                break;
            default:
                res.setHeader('Allow', ['GET', 'POST'])
                res.status(405).send(`Method ${method} Not Allowed`)
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
