import { View } from 'react-native'
import TopNav from '@/components/navigation/TopNav'
import { useState } from 'react'

export default function AppLayout(props: any) {
    const [user, setUser] = useState(false)
    return (
        <View>
            <div className="flex flex-col h-screen justify-center items-center">
                {user && <TopNav />}
                <main className="flex flex-col flex-auto">{props.children}</main>
            </div>
        </View>
    )
}