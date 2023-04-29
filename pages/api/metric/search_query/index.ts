// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ClientMetricPageClickRequest } from '@/isaac/models/MetricPageClick';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { GetMetricPageClickTypes } from '@/isaac/public/api/MetricPageClick';
import { NextApiRequest, NextApiResponse } from 'next'
import { SortType } from '@/isaac/public/SortType';
import MetricSearchQuery, { ClientMetricSearchQueryRequest } from '../../../../isaac/models/MetricSearchQuery';
import { GetMetricSearchQueryTypes } from '@/isaac/public/api/MetricSearchQuery';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { 
        body,
        method 
    } = req;

    try {
        switch (method) {
            case 'GET':
                const metricSearchQueries = await api.MetricSearchQuery.get(GetMetricSearchQueryTypes.ALL_METRIC_SEARCH_QUERY, SortType.RECENTLY_CREATED);

                res.status(200).json({
                    success: true,
                    payload: metricSearchQueries
                });
                break;
            case 'POST':
                if (!body.search_query) { throw new Error('Invalid search query.'); }

                const clientRequest: ClientMetricSearchQueryRequest = {
                    search_query: body.search_query
                }

                const post = await api.MetricSearchQuery.add(clientRequest);

                res.status(200).json({
                    success: true,
                    payload: post
                });
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