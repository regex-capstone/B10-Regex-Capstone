import { NextApiRequest, NextApiResponse } from 'next'
import MockAPI from '@/isaac/mocks/MockAPI'
import API from '@/isaac/api/APIInterface'

const api: API = MockAPI

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await api.getPage('1')
  res.json(data)
}
