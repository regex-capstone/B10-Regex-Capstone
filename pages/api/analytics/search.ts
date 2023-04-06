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
            const searchHistory = await analyticsApi.getSearchHistory();
            res.status(200).json(searchHistory);
            break
        case 'POST':
            if (!body) throw new Error('POST request has no body.');
            if (!body.search) throw new Error('POST request has no search query.');

            const searchID = await analyticsApi.addSearch({
                query: body.search
            });

            res.status(200).json({
                id: searchID
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