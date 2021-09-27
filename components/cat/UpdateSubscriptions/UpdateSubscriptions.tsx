import { useState } from "react"
//components
import Button from "@/components/common/Button"
import UpdatePrimeTimeModal from "./UpdatePrimeTimeModal"

function UpdateSubscriptions(props: any) {
    const { id, subscriptions, title } = props
    const [isVisible, setIsVisible] = useState(false)

    function handleIsVisible(bool: boolean) {
        setIsVisible(bool)
    }

    return (
        <>
            <Button
                title='Update Subscriptions'
                isVisible={true}
                disable={false}
                handleClick={() => handleIsVisible(true)}
            />
            <UpdatePrimeTimeModal
                id={id}
                isVisible={isVisible}
                subscriptions={subscriptions}
                handleOnClose={() => handleIsVisible(false)}
            />
        </>
    )
}

export default UpdateSubscriptions