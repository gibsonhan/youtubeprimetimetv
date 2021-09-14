import type { NextPage } from 'next';
import Link from 'next/Link';
import { View, Text } from 'react-native';

const Home: NextPage = () => {
  return (
    <div className="bg-indigo-600 bg-opacity-100 ...">
      <Text>Hello</Text>
      <Link href="/primetime">
        <Text>Test</Text>
      </Link>
      <Link href="/primetime/all">
        All
      </Link>
    </div>
  )
}

export default Home
