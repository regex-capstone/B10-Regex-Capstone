// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import Page from '@/isaac/models/page.model';
import '@/isaac/providers/MongooseProvider';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method

    switch (method) {
        case 'GET':
            const allPages = await Page.find({})
            res.status(200).json(allPages)
            break
        case 'POST':
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
