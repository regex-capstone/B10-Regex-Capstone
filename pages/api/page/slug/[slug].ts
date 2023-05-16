// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SortType } from '@/isaac/public/SortType';
import { NextApiRequest, NextApiResponse } from 'next'
import Page, { ClientPageUpdateRequest } from '../../../../isaac/models/Page';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import { getServerSession } from 'next-auth';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { GetPageTypes } from '@/isaac/public/api/Page';

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
                if (!session) throw new Error('You must be logged in.');

                if (!body) throw new Error('PUT request has no body.');
                
                const clientRequest: ClientPageUpdateRequest = {
                    title: body.title ?? null,
                    category: body.category ?? null,
                }

                const updated = await api.Page.update(
                    slug as string, 
                    clientRequest
                );

                res.status(200).json({
                    success: true,
                    payload: updated
                });
                break;
            case 'DELETE':
                if (!session) throw new Error('You must be logged in.');
                
                const deletedPageAcknowledgment = await api.Page.delete({
                    _id: page.id as string
                });
                
                // delete connections to this page
                const deletedRevisionAcknowledgment = await api.Revision.delete({
                    page: page.id as string
                });
                const deletedMetricPageClickAcknowledgment = await api.MetricPageClick.delete({
                    page: page.id as string
                });
                const deletedMetricPageFeedbackAcknowledgment = await api.MetricPageFeedback.delete({
                    page: page.id as string
                });

                res.status(200).json({
                    success: true,
                    payload: {
                        page: deletedPageAcknowledgment,
                        revision: deletedRevisionAcknowledgment,
                        metricPageClick: deletedMetricPageClickAcknowledgment,
                        metricPageFeedback: deletedMetricPageFeedbackAcknowledgment
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
