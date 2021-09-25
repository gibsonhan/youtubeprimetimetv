import { Modal } from "react-native";

function CreatePrimeTimeModal(props: any) {
    const { isVisible, handleOnClose } = props

    return (
        <Modal
            animationType={'slide'}
            onRequestClose={() => handleOnClose()}
            visible={isVisible}
        >
            <div className="flex flex-col h-full items-center overflow-scroll">
                {props.children}
            </div>
        </Modal>
    )
}

export default CreatePrimeTimeModal