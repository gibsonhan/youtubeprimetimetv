import { useRef, useState } from 'react'
//components
import Button from '@/components/common/Button'
import { default as FloatingCAT } from '@/components/cat/CreateNewBlock/FloatingButton';
import CreatePrimeTimeModal from '@/components/cat/CreateNewBlock/CreatePrimeTimeModal'
import Youtube from "@/components/youtube/Youtube";

function CreateNewBlock(props: any) {
    const [isVisible, setIsVisible] = useState(false)
    const currSubRef = useRef([])

    async function handleSave() {
        let data: any = {
            rank: 7,
            subscriptions: currSubRef.current
        }

        const resObject = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        try {
            const response = await fetch('/api/primetime', resObject)
            const result = await response.json()
        }

        catch (error) {
            console.error('Internal Server Error', error)
        }
    }

    return (
        <>
            <FloatingCAT handleCAT={() => setIsVisible(true)} />
            <CreatePrimeTimeModal
                isVisible={isVisible}
                handleOnClose={() => setIsVisible(false)}
            >
                <Youtube currSubRef={currSubRef} />
                <Bottom
                    handleSave={() => handleSave}
                    handleOnClose={() => setIsVisible(false)}
                />
            </CreatePrimeTimeModal>
        </>
    )
}

function Bottom(props: any) {
    return (
        <div className="flex justify-center">
            <Button
                title='Save'
                isVisible={true}
                disable={false}
                handleClick={() => props.handleSave()}
            />
            <Button
                title="Cancel"
                isVisible={true}
                disable={false}
                handleClick={() => props.handleOnClose()}
            />
        </div>
    )
}

export default CreateNewBlock