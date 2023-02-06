// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import Page from '@/models/page.model';
import connectToDatabase from '@/providers/MongooseProvider';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase()

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
