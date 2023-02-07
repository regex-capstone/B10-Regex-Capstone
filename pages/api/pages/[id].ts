// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ServerAPI from '@/isaac/api/ServerAPI';
import { NextApiRequest, NextApiResponse } from 'next'
import type API from '../../../isaac/api/APIInterface';
import IPage from '../../../isaac/models/IPage';

const api: API = ServerAPI;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method
  const query = req.query
  const id = query.id

  switch (method) {
    case 'GET':
      const page: IPage = await api.getPage(id);

      res.status(200).json(page)
      //@TODO: handle cannot find page
      break
    case 'PUT':
      const data = JSON.parse(req.body)
      const receivedId = data.id
      const receivedName = data.name
      res.status(200).json({ id: receivedId, name: receivedName })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
