import { createRef, useEffect, useRef } from "react";
import { Modal } from "react-native";
import Button from "@/components/common/Button";
import UpdateLayout from '@/components/cat/UpdateBlock/UpdateLayout'
import Youtube from "@/components/youtube/Youtube";

function UpdatePrimeTimeModal(props: any) {
    const currSubRef = useRef([])
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
            subscriptions: currSubRef.current,
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
    }

    return (
        <Modal
            animationType='slide'
            onRequestClose={() => handleOnClose}
            visible={isVisible}
            presentationStyle='overFullScreen'
        >
            <UpdateLayout
                top={title}
                main={<Youtube currSubRef={currSubRef} id={id} list={subscriptions} />}
                bottom={<Bottom handleOnClose={handleOnClose} handleUpdate={handleUpdate} />}
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