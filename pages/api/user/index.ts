// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import '@/isaac/database/mongoose/MongooseProvider';
import { User } from '@/isaac/models';
import PublicAPIEndpoint from '@/isaac/public/PublicAPI';
import { GetUserTypes } from '@/isaac/public/api/User';
import { ClientUserRequest } from '@/isaac/models/User';
import { AuthOptions } from '@/isaac/auth/next-auth/AuthOptions';
import { getServerSession } from 'next-auth';

const api = PublicAPIEndpoint;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, AuthOptions);
    const { 
        body,
        method 
    } = req;
    let email: string;
    let user: User;
    let users: User[];

    try {
        switch (method) {
            case 'GET':
                if (!session) { throw new Error('Not authorized. >:('); }

                users = await api.User.get(GetUserTypes.ALL_USERS, {}) as User[];

                res.status(200).json({
                    success: true,
                    payload: users
                });

                break;
            case 'POST':
                if (!session) { throw new Error('Not authorized. >:('); }

                if (!body) { throw new Error('No body provided'); }
                if (!body.email) { throw new Error('No email provided'); }

                email = body.email as string;

                user = await api.User.get(GetUserTypes.USER_BY_EMAIL, { email: email }) as User;

                if (user) { throw new Error('User already exists'); }

                const clientRequest: ClientUserRequest = {
                    email: email
                }

                const acknowledgement = await api.User.add(clientRequest);

                res.status(200).json({
                    success: true,
                    acknowledged: acknowledgement
                });

                break;
            case 'DELETE':
                if (!session) { throw new Error('Not authorized. >:('); }

                if (!body) { throw new Error('No body provided'); }
                if (!body.email) { throw new Error('No email provided'); }

                email = body.email;

                res.status(200).json(await api.User.delete({ email: email }));
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong...',
            error: '' + e
        });
    }
}
