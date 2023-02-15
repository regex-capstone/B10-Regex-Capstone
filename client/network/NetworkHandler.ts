import NetworkRequest from "./NetworkRequest";
import NetworkResponse from "./NetworkResponse"

export async function execute<T>(request: NetworkRequest): Promise<T> {
  const res = await fetch(request.url, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: request.body
  })

  // TODO: Error-handling with res.status
  const data = await res.json() as unknown as T
  return data
}