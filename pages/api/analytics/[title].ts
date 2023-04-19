// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { Page, Metric } from '@/isaac/models';
import PublicAPIEndpoint, { SortType } from '@/isaac/public/PublicAPI';
import { GetPageTypes } from '@/isaac/public/api/Page';
import { GetMetricTypes } from '@/isaac/public/api/Metric';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const query = req.query
    const title = query.title as string

    try {
        // TODO: SLUG
        const page: Page = (await api.Page.get(
            GetPageTypes.PAGES_BY_TITLE, 
            SortType.NONE,
            { p_title: title }
        ) as Page[])[0];

        if (!page) {
            throw new Error('Page not found.');
        }

        switch (method) {
        case 'GET':
            const met: Metric[] = (await api.Metric.get(GetMetricTypes.METRICS_OF_PAGE_ID, SortType.RECENTLY_CREATED, { p_id: page.id as string } ) as Metric[]);

            if (!met) {
                throw new Error('Metrics not found.');
            }

            res.status(200).json({
                success: true,
                metrics: met
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