import { useRouter } from 'next/router'
import { AiFillHome } from 'react-icons/ai'
import { VscAccount } from 'react-icons/vsc'
//component
import Icon from '@/components/common/Icon'
import { View } from 'react-native'

export default function AppLayout(props: any) {
    const router = useRouter()
    const handleGoHome = () => router.push('/primetime/all')
    const handleGoSettings = () => router.push('/settings')

    return (
        <View>
            <div className="flex w-full justify-between items-center">
                <Icon icon={<AiFillHome />} handleOnClick={handleGoHome} />
                <Icon icon={<VscAccount />} handleOnClick={handleGoSettings} />
            </div>
            <main>{props.children}</main>
        </View>
    )
}