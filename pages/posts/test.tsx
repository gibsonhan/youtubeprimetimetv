import Link from 'next/link';
import { View, Text } from 'react-native';
const Test = () => {
    return (
        <View>
            <div className="container mx-auto px-4">
                <Link href="/">
                    <div>Home</div>
                </Link>
                <p className="text-xs ...">The quick brown fox ...</p>
                <p className="text-sm ...">The quick brown fox ...</p>
                <p className="text-base ...">The quick brown fox ...</p>
                <p className="text-lg ...">The quick brown fox ...</p>
                <p className="text-xl ...">The quick brown fox ...</p>
                <p className="text-2xl ...">The quick brown fox ...</p>
                <p className="text-3xl ...">The quick brown fox ...</p>
                <p className="text-4xl ...">The quick brown fox ...</p>
                <p className="text-5xl ...">The quick brown fox ...</p>
                <p className="text-6xl ...">The quick brown fox ...</p>
                <p className="text-7xl ...">The quick brown fox ...</p>
                <p className="text-8xl ...">The quick brown fox ...</p>
                <p className="text-9xl ...">The quick brown fox ...</p>
            </div>
        </View>
    )
}

export default Test
