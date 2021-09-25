import { useEffect, useRef, useState } from "react";
import { Modal } from "react-native";
//components
import Button from "@/components/common/Button";
import UpdateLayout from '@/components/cat/UpdateBlock/UpdateLayout'
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
        title,
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
            const response = await fetch('/api/primetime', resObject)
            data = await response.json()
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
        if (isNotEmpty(props.subscriptions)) {
            setMySubList(props.subscriptions)
        }
    }, [props.subscriptions])

    return (
        <Modal
            animationType='slide'
            onRequestClose={() => handleOnClose()}
            visible={isVisible}
            presentationStyle='overFullScreen'
        >
            <UpdateLayout
                top={title}
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