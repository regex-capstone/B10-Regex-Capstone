// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import '@/isaac/database/mongoose/MongooseProvider';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { MetricPageClickAggType } from '@/isaac/public/api/MetricPageClick';
import { GetPageTypes } from '@/isaac/public/api/Page';
import { SortType } from '@/isaac/public/SortType';
import { Page } from '@/isaac/models';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { 
        method 
    } = req;

    try {
        switch (method) {
            case 'GET':
                const return_pages_amount = 5;
                const aggregation: any[] = (await api.MetricPageClick.aggregate(MetricPageClickAggType.TRENDING_PAGES));

                if (aggregation.length < return_pages_amount) {   // If there are less than 5 trending pages, append the most recent pages
                    const recent_pages: Page[] = await api.Page.get(GetPageTypes.ALL_PAGES, SortType.RECENTLY_CREATED) as Page[];
                    const diff = return_pages_amount - aggregation.length;
                    aggregation.push(...recent_pages.slice(0, diff));
                }

                res.status(200).json({
                    success: true,
                    payload: aggregation
                });
                break;
            default:
                res.setHeader('Allow', ['GET'])
                res.status(405).end(`Method ${method} Not Allowed`)
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
