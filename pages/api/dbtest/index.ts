import { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from '@/providers/MongooseProvider';
import Page from '@/models/page.model';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase()

    const page = new Page({
        title: 'Test Title',
        content: 'Test content'
    })

    await page.save();

    return res.status(200).json(page);
}