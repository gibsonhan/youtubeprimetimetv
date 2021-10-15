import { useAtom } from 'jotai'
import { useEffect, useState } from "react";
import { Modal } from "react-native";
//component
import Button from "@/components/common/Button";
//helper
import { isEmpty } from "@/utility/isEmpty";
import { alertAtom, readAlertAtom } from 'store/atom';
import { isNotEmpty } from '@/utility/isNotEmpty';

export default function AlertModal(props: any) {
    const [showModal, setShowModal] = useState(false)
    const [message, setMesage] = useAtom(alertAtom)

    async function handleClose() {
        setMesage('')
        setShowModal(false)
    }

    useEffect(() => {
        if (isNotEmpty(message)) setShowModal(true)
    }, [message])

    return (
        <Modal
            animationType={'slide'}
            onRequestClose={() => setShowModal(false)}
            visible={showModal}
        >
            <div className="flex flex-col h-full items-center overflow-scroll">
                {message}
                <button onClick={() => handleClose()}>Close</button>
            </div>
        </Modal>
    )
}

                //<Button title='Close' disable={false} isVisible={true} handleClick={() => setShowModal(false)} />
