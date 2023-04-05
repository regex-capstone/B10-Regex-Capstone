// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import AnalyticsAPI from '@/isaac/analytics/AnalyticsEndpoints';
import { NextApiRequest, NextApiResponse } from 'next'
import type Analytics from '../../../isaac/analytics/AnalyticsInterface';
import { Page, Metric } from '@/isaac/models';
import API from '@/isaac/api/APIInterface';
import APIEndpoint from '@/isaac/api/APIEndpoint';

const analyticsApi: Analytics = AnalyticsAPI;
const api: API = APIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const query = req.query
    const title = query.title as string

    try {
        const page: Page = await api.getPageByTitle(title);

        if (!page) {
            throw new Error('Page not found.');
        }

        switch (method) {
        case 'GET':
            const met: Metric[] = await analyticsApi.getAnalytics(page.id as string);

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