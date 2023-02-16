import NetworkRequest from "./NetworkRequest";
import NetworkResponse from "./NetworkResponse"

async function execute<T>(req: NetworkRequest): Promise<T> {
  const url = req.params ? `${req.url}/${req.params.join('/')}` : req.url
  const res = await fetch(
    url,
    {
      method: req.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: req.body
    }
  )

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`)
  }

  const data = await res.json() as unknown as T
  return data
}

export default {
  execute: execute
}