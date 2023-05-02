import { ClientMetricSearchQueryRequest } from "@/isaac/models/MetricSearchQuery";
import PublicAPIEndpoint from "@/isaac/public/PublicAPI";
import { SortType } from "@/isaac/public/SortType";
import { GetMetricSearchQueryTypes } from "@/isaac/public/api/MetricSearchQuery";
import { NextApiRequest, NextApiResponse } from "next";

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { 
        body,
        method 
    } = req;

    try {
        switch (method) {
            case 'GET':
                const metricSearchQueries = await api.MetricSearchQuery.get(GetMetricSearchQueryTypes.ALL_METRIC_SEARCH_QUERIES, SortType.RECENTLY_CREATED);

                res.status(200).json({
                    success: true,
                    payload: metricSearchQueries
                });
                break;
            case 'POST':
                if (!body) throw new Error('No body provided.');
                if (!body.search_query) throw new Error('No search query provided.');

                const clientRequest: ClientMetricSearchQueryRequest = {
                    search_query: body.search_query
                }

                const metricSearchQuery = await api.MetricSearchQuery.add(clientRequest);

                res.status(200).json({
                    success: true,
                    payload: metricSearchQuery
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