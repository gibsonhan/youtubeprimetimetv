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
        const accessToken = document.cookie
            .split('; ')
            .find((row: string) => row.startsWith('accessToken='))
            ?.split('=')[1]

        try {
            const response = await fetch(`http://localhost:3001/primetime/${id}}`, {
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id, [title]: inputValue })
            })
            const result = await response.json()
            console.log('what is result', result)
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