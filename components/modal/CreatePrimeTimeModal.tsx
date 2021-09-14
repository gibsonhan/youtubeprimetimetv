import { Modal } from "react-native";
import { useEffect, useState } from "react";
import Youtube from "../youtube/Youtube";

function CreatePrimeTimeModal() {
    const [isVisible, setIsVisible] = useState(false)
    return (
        <>
            <Modal
                animationType={'slide'}
                onRequestClose={() => setIsVisible(false)}
                visible={isVisible}
            >
                <div className="flex flex-col text center">
                    <Youtube />
                    <button onClick={() => setIsVisible(false)}> Cancel </button>
                </div>
            </Modal>
            <button onClick={() => setIsVisible(true)}>Create New PrimeTime</button>
        </>
    )
}

export default CreatePrimeTimeModal