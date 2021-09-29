import { useEffect, useState } from "react"
//components
import Input from "@/components/common/Input";
//helper
import { formatTagsForClient, formatTagsForServer } from "@/utility/extractTag";
import { isNotEmpty } from "@/utility/isNotEmpty";

function UpdateInputTag(props: any) {
    const { id, title, value } = props
    const [defaultValue, setDefaultValue] = useState(value)
    const [inputValue, setInputValue] = useState(value)

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
            [title]: formatTagsForServer(inputValue)
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
            const tagsToString = formatTagsForClient(result[title])
            setDefaultValue(tagsToString)
            setInputValue(tagsToString)
        }
        catch (error) {
            console.error('Internal Server Error', error)
        }
    }

    //onLoad set states
    useEffect(() => {
        if (isNotEmpty(value)) {
            const tagsToString = formatTagsForClient(value)
            setInputValue(tagsToString)
            setDefaultValue(tagsToString)
        }
    }, [])

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

export default UpdateInputTag