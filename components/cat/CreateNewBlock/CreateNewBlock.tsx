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
import useAlert from 'hook/useAlert';

function CreateNewBlock(props: any) {
    const resetRef = useRef<Boolean>(false)
    const alertMessage = useAlert()
    const [isYTclientLoaded, setIsYTClientLoaded] = useState(false)
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
            alertMessage.setAlert(error)
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
    
    const Content = {
        'top': <PrimeTimeCurrentList list={mySublist} handleDeselect={handleDeselect} handleReset={() => handleReset()}/>,
        'main': <Youtube mySubList={mySublist} setMySubList={setMySubList} isYTClientLoaded={isYTclientLoaded} setIsYTClientLoaded={setIsYTClientLoaded} resetRef={resetRef} />,
        'bottom': <Bottom ytClientLoaded={isYTclientLoaded} handleSave={handleSave} handleOnClose={() => setIsVisible(false)} />
    }

    return (
        <>
            <FloatingCAT handleCAT={() => setIsVisible(true)} />
            <CreatePrimeTimeModal
                isVisible={isVisible}
                handleOnClose={() => setIsVisible(false)}
            >
                <CreateLayout
                    mySubList={Content['top']}
                    main={Content['main']} 
                    bottom={Content['bottom']}
                />
            </CreatePrimeTimeModal>
        </>
    )
}

function Bottom(props: any) {
    return (
        <div className="flex flex-row flex-grow justify-center items-center">
            <Button
                title='Save'
                isVisible={true}
                disable={!props.ytClientLoaded}
                handleClick={() => props.handleSave()}
            />
            <span className='mr-10'/>
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