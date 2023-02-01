// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Test endpoint. Responds to requests on /api/user
 * 
 * Example requests:
 * GET request on /api/user/[id]:
 *  $ curl localhost:3000/api/user/echeng23 | json_pp 
 * 
 * PUT request on /api/user/[id]:
 *  $ curl -X PUT localhost:3000/api/user/wenjalan -H 'Content-Type: application/json' -d '{ "id": "wenjalan", "name": "Alan Wen" }' | json_pp
 */

// handles /api/user/[id]
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // method
  // should either be GET or PUT
  const method = req.method

  // query
  // contains the [id] of the path
  const query = req.query
  const id = query.id

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
