import { useRouter } from "next/router";
import { useState } from "react";
//components
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import YoutubeSignUp from "@/components/youtube/YoutubeSignUp";
//util
import isNotMatch from "@/utility/isNotMatching";
import { isEmpty } from "@/utility/isEmpty";

export default function SignUp() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    async function handleSignUp() {
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

        try {
            const response = await fetch('/api/user/signup', reqObj)
            if (!response) router.push('/signin')
        }
        catch (error) {
            console.log('Failed To Sign Up')
        }
    }

    return (
        <div className='flex flex-col flex-auto justify-center items-center'>
            <YoutubeSignUp />
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
            <Input
                title='Re Enter Password'
                type='password'
                value={password2}
                setInputValue={setPassword2}
            />
            <Button
                title='Sign Up'
                disable={isNotMatch(password, password2) || isEmpty(username)}
                isVisible={true}
                handleClick={handleSignUp} />
        </div>
    )
}