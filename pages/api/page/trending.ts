// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import '@/isaac/database/mongoose/MongooseProvider';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import { getServerSession } from 'next-auth';
import PublicAPIEndpoint, { SortType } from '@/isaac/public/PublicAPI';
import { GetPageTypes } from '@/isaac/public/api/Page';
import Page from '@/isaac/models/Page';
import { MetricPageClickAggType } from '@/isaac/public/api/MetricPageClick';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method

    try {
        switch (method) {
            case 'GET':
                // const pages: Page[] = (await api.Page.get(
                //     GetPageTypes.ALL_PAGES, 
                //     SortType.NONE
                // )) as Page[];

                const aggregation: any[] = (await api.MetricPageClick.aggregate(MetricPageClickAggType.TRENDING_PAGES));

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
