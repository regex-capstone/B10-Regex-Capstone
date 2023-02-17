import API from '@/isaac/api/APIInterface'
import ApiEndpoint from '@/isaac/api/APIEndpoint'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'


export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<UserProps>> {
  // get the API instance
  const api: API = ApiEndpoint;

  // get the id from the url
  const id = context.params?.id

  // fetch the user data (from the API)
  // const user = await api.getUser(id)
  const user = {
    id: id as string,
    name: 'Alan Wen'
  }

  return {
    props: {
      user: user
    }
  }
}

interface UserProps {
  user: {
    id: string,
    name: string
  }
}

export default function User(props: UserProps) {
  const { user } = props
  return (
    <h1>Hello, {user.name}</h1>
  )
}