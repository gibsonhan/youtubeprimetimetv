import { useEffect, useState } from "react"
import Input from "@/components/common/Input";
import { formatTagsForClient, formatTagsForServer } from "@/utility/extractTag";

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
            [title]: title === 'tags' ? formatTagsForServer(inputValue) : inputValue
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
            const value = title === 'tags' ? formatTagsForClient(result[title]) : title
            setDefaultValue(value)
        }
        catch (error) {
            console.error('Internal Server Error', error)
        }
    }

    useEffect(() => {
        title === 'tags'
            ? setInputValue(formatTagsForClient(inputValue))
            : setInputValue(value)

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