import { useEffect, useState } from "react"
//components
import Input from "@/components/common/Input";
//helper
import { isNotEmpty } from "@/utility/isNotEmpty";

function UpdateInput(props: any) {
    const { id, title, value } = props
    const [defaultValue, setDefaultValue] = useState(props.value)
    const [inputValue, setInputValue] = useState(props.value)

    const handleBlur = async (e: any) => await handleUpdate()
    const handleKeyPress = async (e: any) => {
        if (e.key === 'Enter') document.activeElement.blur()
    }
    //TODO: consider immer?
    async function handleUpdate() {
        if (defaultValue === inputValue) {
            return
        }

        const data: any = {
            id,
            [title]: inputValue
        }

        const resObject = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        try {
            const response = await fetch(`/api/primetime/${id}}`, resObject)
            const result = await response.json()
            setDefaultValue(result[title])
        }
        catch (error) {
            console.error('Internal Server Error', error)
        }
    }

    useEffect(() => {
        if (isNotEmpty(value)) setInputValue(value)
    }, [value])

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