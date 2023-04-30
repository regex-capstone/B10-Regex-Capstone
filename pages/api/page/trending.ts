// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import '@/isaac/database/mongoose/MongooseProvider';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { MetricPageClickAggType } from '@/isaac/public/api/MetricPageClick';
import { GetPageTypes } from '@/isaac/public/api/Page';
import { SortType } from '@/isaac/public/SortType';
import { Page } from '@/isaac/models';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { 
        method 
    } = req;

    try {
        switch (method) {
            case 'GET':
                const return_pages_amount = 5;
                const aggregation = (await api.MetricPageClick.aggregate(MetricPageClickAggType.TRENDING_PAGES));

                let pages = aggregation.map((e: any) => e.page[0]);
                const views = aggregation.map((e: any) => { 
                    return {
                        id: e._id,
                        views: e.count
                    }
                });

                // If there are less than 5 trending pages, append the most recent pages
                if (pages.length < return_pages_amount) { 
                    const recent_pages: Page[] = await api.Page.get(GetPageTypes.ALL_PAGES, SortType.RECENTLY_CREATED) as Page[];
                    let index = 0;
                    
                    while (index < recent_pages.length && pages.length < return_pages_amount) {
                        const page = recent_pages[index];

                        if (!pages.find((p: Page) => p.slug === page.slug)) {
                            pages.push(page);
                            views.push({
                                id: page.id,
                                views: 0
                            });
                        }
                        index++;
                    }
                } 

                res.status(200).json({
                    success: true,
                    payload: {
                        pages: pages.slice(0, return_pages_amount),
                        views: views.slice(0, return_pages_amount)
                    }
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
