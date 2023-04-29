// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { MetricPageFeedback, Page } from '@/isaac/models';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { GetPageTypes } from '@/isaac/public/api/Page';
import { SortType } from '@/isaac/public/SortType';
import { GetMetricPageFeedbackTypes } from '@/isaac/public/api/MetricPageFeedback';
import { ClientMetricPageFeedbackRequest } from '@/isaac/models/MetricPageFeedback';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = getServerSession(req, res, AuthOptions);
    const { 
        query: { page_id }, 
        method,
        body
    } = req;

    try {
        const page: Page = (
            await api.Page.get(GetPageTypes.PAGE_BY_ID, SortType.NONE, { p_id: page_id as string }) as Page
        );

        if (!page) {
            throw new Error('Page not found.');
        }

        switch (method) {
            case 'GET':
                const payload: MetricPageFeedback[] = (
                    await api.MetricPageFeedback.get(GetMetricPageFeedbackTypes.METRIC_PAGE_FEEDBACK_BY_PAGE, SortType.RECENTLY_CREATED, { p_id: page_id as string}) as MetricPageFeedback[]
                );

                res.status(200).send({
                    success: true,
                    payload: payload
                });
                break;
            case 'POST':
                if (!session) { throw new Error('No session found'); }

                if (!body) { throw new Error('No body provided'); }
                if (body.is_helpful === undefined) { throw new Error('No is_helpful provided'); }

                const userFeedback = (!body.user_feedback) ? '<N/A>' : body.user_feedback;

                const clientRequest: ClientMetricPageFeedbackRequest = {
                    is_helpful: body.is_helpful,
                    user_feedback: userFeedback,
                    page: page_id as string
                }

                const feedback = await api.MetricPageFeedback.add(clientRequest);

                res.status(200).send({
                    success: true,
                    payload: feedback
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