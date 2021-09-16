import { Modal } from "react-native";
import { useEffect, useState } from "react";
import Youtube from "@/components/youtube/Youtube";
import Button from "@/components/common/Button";

function CreatePrimeTimeModal() {
    const [isVisible, setIsVisible] = useState(false)

    function handleIsVisible(bool: boolean) {
        setIsVisible(bool)
    }

    return (
        <>
            <Modal
                animationType={'slide'}
                onRequestClose={() => setIsVisible(false)}
                visible={isVisible}
            >
                <div className="flex flex-col h-full text center">
                    <Youtube />
                    <Button title={"Cancel"} isVisible={true} disable={false} handleClick={() => handleIsVisible(false)} />
                </div>
            </Modal>
            <Button title={"Create"} isVisible={true} disable={false} handleClick={() => handleIsVisible(true)} />
        </>
    )
}

export default CreatePrimeTimeModal