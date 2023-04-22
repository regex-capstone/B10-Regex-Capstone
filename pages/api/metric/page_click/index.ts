// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ClientMetricPageClickRequest } from '@/isaac/models/MetricPageClick';
import PublicAPIEndpoint, { SortType } from '@/isaac/public/PublicAPI';
import { GetMetricPageClickTypes } from '@/isaac/public/api/MetricPageClick';
import { NextApiRequest, NextApiResponse } from 'next'

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const body = req.body;

    try {
        switch (method) {
            case 'GET':
                const metricPageClicks = await api.MetricPageClick.get(GetMetricPageClickTypes.ALL_METRIC_PAGE_CLICKS, SortType.RECENTLY_CREATED);
                
                res.status(200).json({
                    success: true,
                    payload: metricPageClicks
                });
                break;
                
            case 'POST':
                if (!body) throw new Error('No body provided.');
                if (!body.page_id) throw new Error('No page id provided.');

                const clientRequest: ClientMetricPageClickRequest = {
                    page_id: body.page_id
                }

                const payload = await api.MetricPageClick.add(clientRequest);

                res.status(200).json({
                    success: true,
                    payload: payload
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