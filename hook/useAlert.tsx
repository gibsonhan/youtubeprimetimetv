import { alertAtom } from '@store/atom'
import { useAtom } from 'jotai'

export default () => {
    const [, setAlert] = useAtom(alertAtom)

    return  {
        setAlert
    }
}