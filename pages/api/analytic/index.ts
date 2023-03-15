// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import AnalyticsAPI from '@/isaac/analytics/AnalyticsEndpoints';
import { NextApiRequest, NextApiResponse } from 'next'
import type Analytics from '../../../isaac/analytics/AnalyticsInterface';

const analyticsApi: Analytics = AnalyticsAPI;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const body = req.body;

    try {
        switch (method) {
        case 'GET':
            const allAnalytics = await analyticsApi.getAllAnalytics();
            res.status(200).json(allAnalytics);
            break
        case 'POST':
            if (!body) throw new Error('POST request has no body.');

            const metId = await analyticsApi.addAnalytic(body);

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