// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import MongooseModels from '@/isaac/database/mongoose/MongooseModels';
import '@/isaac/database/mongoose/MongooseProvider';
import API from '@/isaac/api/APIInterface';
import ApiEndpoint from '@/isaac/api/APIEndpoint';
import { User } from '@/isaac/models';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import { getServerSession } from 'next-auth';

const api: API = ApiEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, AuthOptions);
    const method = req.method;
    const body = req.body;
    const query = req.query;

    try {
        switch (method) {
            case 'GET':
                if (!session) {
                    throw new Error('Not authenticated.');
                }

                const email: string = session.user.email;

                const user: User = await api.getUserByEmail(email);

                if (!user) {
                    throw new Error('User not found.');
                }

                res.status(200).json({
                    success: true,
                    user: user
                });
                
                break;
            case 'PUT':
                if (!body) throw new Error('PUT request has no body.');

                const userId = await api.updateUser(body);

                res.status(200).json({
                    success: true,
                    user_id: userId
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
