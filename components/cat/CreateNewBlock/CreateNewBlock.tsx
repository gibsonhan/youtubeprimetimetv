import router from 'next/router';
import { useRef, useState } from 'react'
//layout
import CreateLayout from '@/components/cat/CreateNewBlock/CreateLayout';
//components
import Button from '@/components/common/Button';
import CreatePrimeTimeModal from '@/components/cat/CreateNewBlock/CreatePrimeTimeModal';
import { default as FloatingCAT } from '@/components/cat/CreateNewBlock/FloatingButton';
import PrimeTimeCurrentList from '@/components/primetime/PrimeTimeCurrentList';
import Youtube from "@/components/youtube/Youtube";

function CreateNewBlock(props: any) {
    const resetRef = useRef<Boolean>(false)
    const [mySublist, setMySubList] = useState<any>([])
    const [isVisible, setIsVisible] = useState(false)

    async function handleSave() {
        let data: any = {
            title: 'hello world',
            description: 'fight king',
            userId: '2312321',
            rank: 7,
            subscriptions: mySublist
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
            const route = `/primetime/${result.id}`
            router.push(route)
        }

        catch (error) {
            console.error('Internal Server Error', error)
        }
    }

    async function handleReset() {
        //https://dmitripavlutin.com/react-useref-guide/
        resetRef.current = true
        setMySubList([])
        setTimeout(() => {
            resetRef.current = false
        }, 0)
    }

    return (
        <>
            <FloatingCAT handleCAT={() => setIsVisible(true)} />
            <CreatePrimeTimeModal
                isVisible={isVisible}
                handleOnClose={() => setIsVisible(false)}
            >
                <CreateLayout
                    mySubList={<PrimeTimeCurrentList list={mySublist} handleReset={() => handleReset()} />}
                    main={
                        <Youtube
                            mySubList={mySublist}
                            setMySubList={setMySubList}
                            resetRef={resetRef}
                        />
                    }
                    bottom={<Bottom handleSave={() => handleSave()} handleOnClose={() => setIsVisible(false)} />}
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