import { useRouter } from 'next/router'
import { AiFillHome } from 'react-icons/ai'
import { VscAccount } from 'react-icons/vsc'
//component
import Icon from '@/components/common/Icon'
export default function TopNav() {
    const router = useRouter()
    const handleGoHome = () => router.push('/primetime/all')
    const handleGoSettings = () => router.push('/settings')

    return (
        <nav className="flex w-full justify-between items-center">
            <Icon icon={<AiFillHome />} handleOnClick={handleGoHome} />
            <Icon icon={<VscAccount />} handleOnClick={handleGoSettings} />
        </nav>
    )
}