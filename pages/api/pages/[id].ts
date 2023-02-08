// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ServerAPI from '@/isaac/api/ServerAPI';
import { NextApiRequest, NextApiResponse } from 'next'
import type API from '../../../isaac/api/APIInterface';
import Page from '../../../isaac/models/Page';
import Revision from '../../../isaac/models/Revision';

const api: API = ServerAPI;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method
  const query = req.query
  const id = query.id

  try {
    switch (method) {
      case 'GET':
        // get the page information
        const page: Page = await api.getPage(id);
        // get the latest revision information
        const rev: Revision = await api.getRecentPageRevision(id);
        res.status(200).json({
          success: true,
          page: page,
          rev: rev
        });
        //@TODO: handle cannot find page
        break;
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).send(`Method ${method} Not Allowed`)
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
