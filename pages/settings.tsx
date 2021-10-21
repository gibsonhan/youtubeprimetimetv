import { useAtom } from 'jotai'
import Button from '@/components/common/Button'
import { signedInAtom } from '@store/atom'
import { useRouter } from 'next/router'

export default function Setting() {
    const router = useRouter()
    const [,setSignedIn] = useAtom(signedInAtom)
    function handleLogOut(){
       document.cookie ='accessToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
       setSignedIn(false)
       router.push('/landing')
    }

    return (
        <div className='flex flex-col flex-grow justify-center items-center'>
            <Button 
                title='SignOut'
                disable={false} 
                isVisible={true}
                handleClick={handleLogOut}
                />
        </div>
    )
}