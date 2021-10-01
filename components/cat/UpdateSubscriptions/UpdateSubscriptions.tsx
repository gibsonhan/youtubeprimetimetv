import { useState } from "react"
//components
import Button from "@/components/common/Button"
import UpdatePrimeTimeModal from "./UpdatePrimeTimeModal"
import { useRouter } from "next/router"

function UpdateSubscriptions(props: any) {
    const { id, subscriptions, title } = props
    const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()

    function handleOnClose() {
        setIsVisible(false)
        router.reload()
    }

    return (
        <>
            <Button
                title='Update Subscriptions'
                isVisible={true}
                disable={false}
                handleClick={() => setIsVisible(true)}
            />
            <UpdatePrimeTimeModal
                id={id}
                isVisible={isVisible}
                subscriptions={subscriptions}
                handleOnClose={() => handleOnClose()}
            />
        </>
    )
}

export default UpdateSubscriptions