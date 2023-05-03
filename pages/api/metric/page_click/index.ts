import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { GetMetricPageClickTypes } from '@/isaac/public/api/MetricPageClick';
import { NextApiRequest, NextApiResponse } from 'next'
import { SortType } from '@/isaac/public/SortType';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { 
        method 
    } = req;

    try {
        switch (method) {
            case 'GET':
                const metricPageClicks = await api.MetricPageClick.get(GetMetricPageClickTypes.ALL_METRIC_PAGE_CLICKS, SortType.RECENTLY_CREATED);

                res.status(200).json({
                    success: true,
                    payload: metricPageClicks
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