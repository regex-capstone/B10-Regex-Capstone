export default interface NetworkRequest {
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: any,
  params?: string[],
}