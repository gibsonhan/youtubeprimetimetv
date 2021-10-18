import { useAtom } from 'jotai'
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
//store
import { alertAtom } from '@store/atom';
import { isNotEmpty } from '@/utility/isNotEmpty';

function CreateNewBlock(props: any) {
    const resetRef = useRef<Boolean>(false)
    const [_, setAlert] = useAtom(alertAtom)
    const [isVisible, setIsVisible] = useState(false)
    const [mySublist, setMySubList] = useState<any>([])

    function handleDeselect(id: string) {
        setMySubList((state: any) => state.filter((ele: any) => ele.channelId !== id)
        )
    }

    async function handleSave() {
        let data: any = {
            title: 'Enter Title',
            description: 'Enter Description',
            tags: ['Create tags with', 'hashtag'],
            shared: [],
            rank: 999,
            subscriptions: mySublist
        }
        const accessToken: any = document.cookie
            .split('; ')
            .find((row: string) => row.startsWith('accessToken='))
            ?.split('=')[1]

        try {
            const url = 'http://localhost:3001/primetime'
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
            const result = await res.json()
            if (res.ok) router.push(`/primetime/${result.id}`)
            else {
                const { message } = result
                throw `${message}`
            }
        }
        catch (error: any) {
            setAlert('Failed to Save PrimeTime')
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
                    mySubList={
                        <PrimeTimeCurrentList
                            list={mySublist}
                            handleDeselect={handleDeselect}
                            handleReset={() => handleReset()}
                        />}
                    main={
                        <Youtube
                            mySubList={mySublist}
                            setMySubList={setMySubList}
                            resetRef={resetRef}
                        />
                    }
                    bottom={<Bottom handleSave={handleSave} handleOnClose={() => setIsVisible(false)} />}
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