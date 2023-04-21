// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import '@/isaac/database/mongoose/MongooseProvider';
import { User } from '@/isaac/models';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import { getServerSession } from 'next-auth';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { GetUserTypes } from '@/isaac/public/api/User';

const api = PublicAPIEndpoint;

// TODO: double check this works
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, AuthOptions);
    const method = req.method;
    const body = req.body;

    try {
        switch (method) {
        case 'GET':
            if (!session) {
                throw new Error('Not authenticated.');
            }

            const email: string | null | undefined = session.user?.email;
            
            if (!email) {
                throw new Error('Not authenticated.');
            }

            const user: User = await api.User.get(
                GetUserTypes.USER_BY_EMAIL,
                { email: email }
            );

            if (!user) {
                throw new Error('User not found.');
            }

            res.status(200).json({
                success: true,
                payload: user
            });
                
            break;
        case 'PUT':
            if (!body) throw new Error('PUT request has no body.');

            const userId = await api.User.update(body);

            res.status(200).json({
                success: true,
                payload: userId
            });
                
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
