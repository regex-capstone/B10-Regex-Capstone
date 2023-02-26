// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import AnalyticsAPI from '@/isaac/analytics/AnalyticsEndpoints';
import { NextApiRequest, NextApiResponse } from 'next'
import type Analytics from '../../../isaac/analytics/AnalyticsInterface';
import Metric from '@/isaac/analytics/model';

const analyticsApi: Analytics = AnalyticsAPI;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const body = req.body;
    const query = req.query
    const p_id = query.p_id as string

    try {
        switch (method) {
            case 'GET':
                const met: Metric[] = await analyticsApi.getAnalytics(p_id);

                if (!met) {
                    throw new Error('Metrics not found.');
                }

                res.status(200).json({
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