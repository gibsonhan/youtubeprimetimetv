import { View } from 'react-native'
import TopNav from '@/components/navigation/TopNav'
import { useState } from 'react'
import { default as AlertMessage } from '../common/AlertModal'

export default function AppLayout(props: any) {
    const [user, setUser] = useState(false)
    return (
        <View>
            <div className="flex flex-col h-screen justify-center items-center">
                <AlertMessage />
                <TopNav />
                <main className="flex flex-col flex-auto">{props.children}</main>
            </div>
        </View>
    )
}