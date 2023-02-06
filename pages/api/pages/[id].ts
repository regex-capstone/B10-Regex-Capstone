// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method
  const query = req.query
  const id = query.id

  // @TODO: Finish the page specific handler 
  // handle request
  switch (method) {
    // GET request handler
    case 'GET':
      // send back id
      res.status(200).json({ id: id })
      break

    // PUT request handler
    case 'PUT':
      // deconstruct and reconstruct body
      const data = JSON.parse(req.body)
      const receivedId = data.id
      const receivedName = data.name
      res.status(200).json({ id: receivedId, name: receivedName })
      break

    // default request handler
    default:
      // report allowed methods and reject
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
