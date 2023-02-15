import Page from '@/isaac/models/Page'
import NetworkRequest from '../NetworkRequest'

const GetPages: NetworkRequest = {
  url: 'http://localhost:3000/api/page',
  method: 'GET',
}

export default GetPages