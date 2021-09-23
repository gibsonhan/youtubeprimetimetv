import { Modal } from "react-native";
import { useState } from "react";
import Youtube from "@/components/youtube/Youtube";
import Button from "@/components/common/Button";

function UpdatePrimeTimeModal(props: any) {
    const [isVisible, setIsVisible] = useState(false)

    function handleIsVisible(bool: boolean) {
        setIsVisible(bool)
    }

    return (
        <>
            <Modal
                animationType='slide'
                onRequestClose={() => handleIsVisible}
                visible={isVisible}
                presentationStyle='overFullScreen'
            >
                <div className="flex flex-col h-auto justify-center items-center overflow-scroll">
                    <div className='flex-none flex text-2xl m-8 items-center'>{props.title} </div>
                    <div className='flex-1 overflow-auto'>
                        <Youtube id={props.id} list={props.subscriptions} />
                    </div>
                    <div className='flex-none flex justify-end'>
                        <Button
                            title={"Cancel"}
                            isVisible={true}
                            disable={false}
                            handleClick={() => handleIsVisible(false)}
                        />

                    </div>
                </div>
            </Modal>
            <Button
                title={"Update PrimeTime"}
                isVisible={true}
                disable={false}
                handleClick={() => handleIsVisible(true)}
            />
        </>
    )
}

export default UpdatePrimeTimeModal