import { useAtom } from 'jotai'
import { useEffect, useState } from "react";
import { Modal } from "react-native";
//component
import Button from "@/components/common/Button";
//helper
import { alertAtom } from 'store/atom';
import { isEmpty } from '@/utility/isEmpty';

export default function AlertModal(props: any) {
    const [showModal, setShowModal] = useState(false)
    const [message, setMesage] = useAtom(alertAtom)

    const handleClose = () => setMesage('')

    useEffect(() => {
        (isEmpty(message)) ? setShowModal(false) : setShowModal(true)
        console.log('what is the message', message)
    }, [message])

    const position = "flex flex-col flex-grow justify-center items-center"

    return (
        <Modal
            animationType={'slide'}
            onRequestClose={() => setShowModal(false)}
            visible={showModal}
        >
            <div className={`${position}`}>
                <div className='mb-32'>{message}</div>
                <Button
                    title="close"
                    disable={false}
                    isVisible={true}
                    handleClick={handleClose}
                />
            </div>
        </Modal>
    )
}
