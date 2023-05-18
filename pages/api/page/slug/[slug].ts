// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SortType } from '@/isaac/public/SortType';
import { NextApiRequest, NextApiResponse } from 'next'
import Page, { ClientPageUpdateRequest } from '../../../../isaac/models/Page';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import { getServerSession } from 'next-auth';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { GetPageTypes } from '@/isaac/public/api/Page';
import { GetRevisionTypes } from '@/isaac/public/api/Revision';
import { Revision } from '@/isaac/models';

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
        const page: Page = (
            await api.Page.get(
                GetPageTypes.PAGE_BY_SLUG,
                SortType.NONE,
                {
                    p_slug: slug as string,
                    populate: populate
                }
            ) as Page
        );

        if (!page) {
            throw new Error('Page not found.');
        }

        switch (method) {
            case 'GET':
                res.status(200).json({
                    success: true,
                    payload: page
                });
                break;
            case 'PUT':
                // if (!session) throw new Error('You must be logged in.');
                if (!body) throw new Error('PUT request has no body.');

                const clientRequest: ClientPageUpdateRequest = {}

                if (body.title) clientRequest.title = body.title;
                if (body.category) clientRequest.category = body.category;

                if (clientRequest.category === 'uncategorized') {
                    clientRequest.category = null;
                }

                const updated = await api.Page.update(slug as string, clientRequest);
                const revision = await api.Revision.get(GetRevisionTypes.RECENT_REVISION_OF_PAGE_ID, SortType.RECENTLY_CREATED, { p_id: page.id as string }) as Revision;
                const text = ((clientRequest.title) ? clientRequest.title : page.title) + " " + revision.content
                    .replaceAll(/<[^>]*>/g, ' ')
                    .replaceAll(/\s{2,}/g, ' ')
                    .trim();

                await api.Search.add(page.id as string, text);

                res.status(200).json({
                    success: true,
                    payload: (await api.Page.get(GetPageTypes.PAGE_BY_ID, SortType.NONE, { p_id: page.id as string })) as Page
                });
                break;
            case 'DELETE':
                if (!session) throw new Error('You must be logged in.');

                const deletedPageAcknowledgment = await api.Page.delete({ slug: page.slug as string });

                // delete connections to this page
                const deletedRevisionAcknowledgment = await api.Revision.delete({ page: page.id as string });
                const deletedMetricPageClickAcknowledgment = await api.MetricPageClick.delete({ page: page.id as string });
                const deletedMetricPageFeedbackAcknowledgment = await api.MetricPageFeedback.delete({ page: page.id as string });
                const deletedSearchAcknowledgment = await api.Search.delete(page.id as string);

                res.status(200).json({
                    success: true,
                    payload: {
                        page: deletedPageAcknowledgment,
                        revision: deletedRevisionAcknowledgment,
                        metricPageClick: deletedMetricPageClickAcknowledgment,
                        metricPageFeedback: deletedMetricPageFeedbackAcknowledgment,
                        search: deletedSearchAcknowledgment
                    }
                });
                break;
            default:
                res.setHeader('Allow', ['GET, DELETE, PUT'])
                res.status(405).send(`Method ${method} Not Allowed`)
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
