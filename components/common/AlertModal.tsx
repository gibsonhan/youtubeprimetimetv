import { useRouter } from 'next/router';
import { useAtom } from 'jotai'
import { useEffect, useState } from "react";
import { Modal } from "react-native";
//component
import Button from "@/components/common/Button";
//helper
import { isEmpty } from '@/utility/isEmpty';
//store
import { alertAtom } from '@store/atom';

export default function AlertModal(props: any) {
    const router = useRouter()
    const [showModal, setShowModal] = useState(false)
    const [message, setMesage] = useAtom(alertAtom)

    const handleClose = () => {
        setMesage('')
        if(message === 'Unauthorized') router.push('/landing') 
    }

    useEffect(() => {
        (isEmpty(message)) ? setShowModal(false) : setShowModal(true)
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
