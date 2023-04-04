// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import AnalyticsAPI from '@/isaac/analytics/AnalyticsEndpoints';
import { NextApiRequest, NextApiResponse } from 'next'
import type Analytics from '../../../isaac/analytics/AnalyticsInterface';
import Metric from '@/isaac/analytics/model';
import ApiEndpoint from '../../../isaac/api/APIEndpoint';
import API from '@/isaac/api/APIInterface';
import { Page } from '@/isaac/models';

const analyticsApi: Analytics = AnalyticsAPI;
const api: API = ApiEndpoint;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method
    const query = req.query
    const title = query.title as string

    try {
        switch (method) {
        case 'GET':
            const page = (await api.getPageByTitle(title)) as Page;

            if (!page) {
                throw new Error('Page not found.');
            }

            const page_id: string = page.id as string;

            const met: Metric[] = await analyticsApi.getAnalytics(page_id as string);

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