import { Modal } from "react-native";
//components
import Button from "@/components/common/Button";
import Youtube from "@/components/youtube/Youtube";

function CreatePrimeTimeModal(props: any) {
    const { isVisible, handleIsVisible } = props

    return (
        <Modal
            animationType={'slide'}
            onRequestClose={() => handleIsVisible(false)}
            visible={isVisible}
        >
            <div className="flex flex-col h-full items-center overflow-scroll">
                {props.children}
            </div>
        </Modal>
    )
}

export default CreatePrimeTimeModal