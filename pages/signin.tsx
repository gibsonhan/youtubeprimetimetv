import { useAtom } from 'jotai'
import { useRouter } from "next/router";
import { useState } from "react";
//components
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import YoutubeSignIn from "@/components/youtube/YoutubeSignIn";
import { alertAtom } from "store/atom";

export default function SignIn() {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useAtom(alertAtom)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignIn() {
        const baseUrl = 'http://localhost:3001/auth/signin'
        const data = {
            username,
            password,
            type: 'regular'
        }
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })

        try {
            const result = await response
            if (result) router.push('/primetime/all')
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='flex flex-col flex-auto justify-center items-center'>
            <YoutubeSignIn />
            <Input
                title='username'
                type='text'
                inputValue={username}
                setInputValue={setUsername}
            />
            <Input
                title='password'
                type='password'
                value={password}
                setInputValue={setPassword}
            />
            <Button
                title='Sign In'
                disable={false}
                isVisible={true}
                handleClick={handleSignIn} />
        </div>
    )
}