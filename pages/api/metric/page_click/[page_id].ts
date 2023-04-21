// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { MetricPageClick, Page } from '@/isaac/models';
import PublicAPIEndpoint, { SortType } from '@/isaac/public/PublicAPI';
import { GetPageTypes } from '@/isaac/public/api/Page';
import { GetMetricPageClickTypes } from '@/isaac/public/api/MetricPageClick';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const query = req.query
    const page_id = query.page_id as string

    try {
        const page: Page = (await api.Page.get(
            GetPageTypes.PAGE_BY_ID,
            SortType.NONE,
            { p_id: page_id }
        ) as Page)

        if (!page) {
            throw new Error('Page not found.');
        }

        switch (method) {
            case 'GET':
                const payload: MetricPageClick[] = (await api.MetricPageClick.get(
                    GetMetricPageClickTypes.METRIC_PAGE_CLICKS_BY_PAGE,
                    SortType.RECENTLY_CREATED,
                    { p_id: page_id }
                ) as MetricPageClick[]);

                res.status(200).send({
                    success: true,
                    payload: payload
                });
                break;
            default:
                res.setHeader('Allow', ['GET'])
                res.status(405).send(`Method ${method} Not Allowed`)
            }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}