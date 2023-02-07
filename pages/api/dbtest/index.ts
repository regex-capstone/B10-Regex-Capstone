import { NextApiRequest, NextApiResponse } from 'next'
import '@/isaac/providers/MongooseProvider';
import Page from '@/isaac/models/page.model';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // const page = new Page({
    //     title: 'Test Title',
    //     content: 'Test content'
    // })

    // await page.save();

    return res.status(200).json({ text: 'hi' });
}