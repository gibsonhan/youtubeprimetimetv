import { useRouter } from "next/router";
import { useState } from "react";
//components
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import YoutubeSignIn from "@/components/youtube/YoutubeSignIn";

export default function SignIn() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignIn() {
        const data = {
            username,
            password,
            type: 'regular'
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const response = await fetch('/api/user/signin', reqObj)
        const result = await response.json()
        if (!result.error) router.push('/primetime/all')
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