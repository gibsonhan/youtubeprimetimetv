import { useState } from 'react'
//components
import Button from '@/components/common/Button'
import { default as FloatingCAT } from '@/components/cat/CreateNewBlock/FloatingButton';
import CreatePrimeTimeModal from '@/components/cat/CreateNewBlock/CreatePrimeTimeModal'
import Youtube from "@/components/youtube/Youtube";

function CreateNewBlock(props: any) {
    const [isVisible, setIsVisible] = useState(false)

    function handleIsVisible(bool: boolean) {
        setIsVisible(bool)
    }

    return (
        <>
            <FloatingCAT handleCAT={() => handleIsVisible(true)} />
            <CreatePrimeTimeModal
                isVisible={isVisible}
                handleIsVisible={handleIsVisible}
            >
                <Youtube />
                <Button
                    title="Cancel"
                    isVisible={true}
                    disable={false}
                    handleClick={() => handleIsVisible(false)}
                />
            </CreatePrimeTimeModal>
        </>
    )
}

export default CreateNewBlock