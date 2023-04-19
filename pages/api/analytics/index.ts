// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import PublicAPIEndpoint, { SortType } from '@/isaac/public/PublicAPI';
import { GetMetricTypes } from '@/isaac/public/api/Metric';
import { NextApiRequest, NextApiResponse } from 'next'

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const body = req.body;

    try {
        switch (method) {
        case 'GET':
            const allAnalytics = await api.Metric.get(GetMetricTypes.ALL_METRICS, SortType.RECENTLY_CREATED);
            res.status(200).json(allAnalytics);
            break
        case 'POST':
            if (!body) throw new Error('POST request has no body.');
            if (!body.major) throw new Error('POST request has no major.');
            if (!body.standing) throw new Error('POST request has no standing.');
            if (!body.met_page_id) throw new Error('POST request has no met_page_id.');

            const metId = await api.Metric.add({
                major: body.major,
                standing: body.standing,
                met_page_id: body.met_page_id
            });

            res.status(200).json({
                met_id: metId
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