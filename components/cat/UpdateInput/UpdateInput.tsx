import { useEffect, useState } from "react"
import Input from "@/components/common/Input";

function UpdateInput(props: any) {
    const [defaultValue, setDefaultValue] = useState(props.value)
    const [inputValue, setInputValue] = useState(props.value)

    const handleBlur = async (e: any) => await handleUpdate()
    const handleKeyPress = async (e: any) => {
        if (e.key === 'Enter') document.activeElement.blur()
    }
    //TODO: consider immer?
    async function handleUpdate() {
        console.log(typeof defaultValue, typeof inputValue, defaultValue === inputValue)
        if (defaultValue === inputValue) {
            return
        }

        const data: any = {
            id: props.id,
            [props.title]: inputValue
        }

        const resObject = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        try {
            const response = await fetch(`/api/primetime/${props.id}}`, resObject)
            const result = await response.json()
            setDefaultValue(result[props.title])
        }
        catch (error) {
            console.error('Internal Server Error', error)
        }
    }

    return (
        <Input
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleKeyPress={handleKeyPress}
            handleBlur={handleBlur}
            {...props}
        />
    )
}

export default UpdateInput