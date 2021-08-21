import type { NextPage } from 'next';
import Link from 'next/Link';
import { View, Text } from 'react-native';
const Home: NextPage = () => {
  return (
    <div className="bg-indigo-600 bg-opacity-100 ...">
      <Text>Hello</Text>
      <Link href="/posts/test">
        <Text>Test</Text>
      </Link>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img className="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">ChitChat</div>
          <p className="text-gray-500">You have a new message!</p>
        </div>
      </div>
    </div>
  )
}

export default Home
