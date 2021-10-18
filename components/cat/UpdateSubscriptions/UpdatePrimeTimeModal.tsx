import { useEffect, useRef, useState } from "react";
import { Modal } from "react-native";
//components
import Button from "@/components/common/Button";
import UpdateLayout from '@/components/cat/UpdateSubscriptions/UpdateLayout'
import Youtube from "@/components/youtube/Youtube";
import PrimeTimeCurrentList from "@/components/primetime/PrimeTimeCurrentList";
//helper
import { isNotEmpty } from "@/utility/isNotEmpty";
import router from "next/router";

function UpdatePrimeTimeModal(props: any) {
    const resetRef = useRef<Boolean>(false)
    const [mySublist, setMySubList] = useState<any>([])
    const {
        handleOnClose,
        id,
        isVisible,
        subscriptions,
    } = props

    function handleDeselect(id: string) {
        setMySubList((state: any) => state.filter((ele: any) => ele.channelId !== id))
    }

    async function handleUpdate() {
        const accessToken = document.cookie
            .split('; ')
            .find((row: string) => row.startsWith('accessToken='))
            ?.split('=')[1]
        try {
            const res = await fetch(`http://localhost:3001/primetime/${id}`, {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id, subscriptions: mySublist })
            })

            if (res.ok) {
                handleOnClose()
            }
        }
        catch (error: any) {
            console.log(error)
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

    useEffect(() => {
        if (isNotEmpty(subscriptions)) setMySubList(subscriptions)
    }, [subscriptions])

    return (
        <Modal
            animationType='slide'
            onRequestClose={() => handleOnClose()}
            visible={isVisible}
            presentationStyle='overFullScreen'
        >
            <UpdateLayout
                top={'Select Your Youtubers'}
                currSubList={
                    <PrimeTimeCurrentList
                        list={mySublist}
                        handleDeselect={handleDeselect}
                        handleReset={() => handleReset()}
                    />
                }
                main={
                    <Youtube
                        id={id}
                        mySubList={mySublist}
                        setMySubList={setMySubList}
                        resetRef={resetRef} />
                }
                bottom={
                    <Bottom
                        handleOnClose={handleOnClose}
                        handleUpdate={handleUpdate} />
                }
            />
        </Modal>
    )
}

function Bottom(props: any) {
    return (
        <>
            <Button
                title="Update"
                isVisible={true}
                disable={false}
                handleClick={() => props.handleUpdate()}
            />
            <Button
                title="Cancel"
                isVisible={true}
                disable={false}
                handleClick={() => props.handleOnClose()}
            />
        </>
    )
}

export default UpdatePrimeTimeModal