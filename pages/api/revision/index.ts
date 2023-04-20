// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import '@/isaac/database/mongoose/MongooseProvider';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { ClientRevisionRequest } from '@/isaac/models/Revision';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, AuthOptions);
    const method = req.method
    const body = req.body;

    try {
        switch (method) {
        case 'POST':
            if (!session) throw new Error('You must be logged in.');

            if (!body) throw new Error('POST request has no body.');
            if (!body.content) throw new Error('POST request has no content.');
            if (!body.rev_page_id) throw new Error('POST request has no rev_page_id.');

            // TODO: check here
            const clientRequest: ClientRevisionRequest = {
                content: body.content,
                rev_page_id: body.rev_page_id
            }

            const rev = await api.Revision.add(clientRequest);

            console.log(rev);

            res.status(200).json({
                success: true,
                revision_id: rev.id
            });
                
            break;
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
