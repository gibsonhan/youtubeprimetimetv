import { View } from 'react-native'
import TopNav from '@/components/navigation/TopNav'

export default function AppLayout(props: any) {
    return (
        <View>
            <div className="flex flex-col justify-center items-center">
                <TopNav />
                <main>{props.children}</main>
            </div>
        </View>
    )
}