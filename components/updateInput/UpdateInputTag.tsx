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

        const accessToken = document.cookie
            .split('; ')
            .find((row: string) => row.startsWith('accessToken='))
            ?.split('=')[1]

        try {
            const res = await fetch(`http://localhost:3001/primetime/${id}`, {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id, [title]: formatTagsForServer(inputValue) })
            })
            const result = await res.json()
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