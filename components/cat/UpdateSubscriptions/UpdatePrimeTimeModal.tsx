import { useEffect, useRef, useState } from "react";
import { Modal } from "react-native";
//components
import Button from "@/components/common/Button";
import UpdateLayout from '@/components/cat/UpdateSubscriptions/UpdateLayout'
import Youtube from "@/components/youtube/Youtube";
import PrimeTimeCurrentList from "@/components/primetime/PrimeTimeCurrentList";
//helper
import { isNotEmpty } from "@/utility/isNotEmpty";

function UpdatePrimeTimeModal(props: any) {
    const resetRef = useRef<Boolean>(false)
    const [mySublist, setMySubList] = useState<any>([])
    const {
        handleOnClose,
        id,
        isVisible,
        subscriptions,
    } = props

    async function handleUpdate() {
        let data: any = {
            id,
            subscriptions: mySublist,
        }

        const resObject = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        try {
            const response = await fetch(`/api/primetime/${id}}`, resObject)
            data = await response.json()
            console.log('Update', data)
        }
        catch (error) {
            console.error('Internal Server Error', error)
        }
        handleOnClose()
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
        if (isNotEmpty(subscriptions)) {
            setMySubList(subscriptions)
        }
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
                currSubList={<PrimeTimeCurrentList
                    list={mySublist}
                    handleReset={() => handleReset()} />
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