import { useState } from "react";
import { Modal } from "react-native";
//component
import Button from "@/components/common/Button";
import router from "next/router";
import DeleteBlockModal from "./DeleteBlockModal";

function DeleteBlock(props: any) {
    const [isVisible, setIsVisible] = useState(false)
    return (
        <>
            <Button
                title='Delete'
                isVisible={true}
                disable={false}
                handleClick={() => setIsVisible(true)}
            />
            <DeleteBlockModal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            />
        </>
    )
}

export default DeleteBlock