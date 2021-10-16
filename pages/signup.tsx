import { atom, useAtom } from 'jotai'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//components
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import YoutubeSignUp from "@/components/youtube/YoutubeSignUp";
//util
import isNotMatch from "@/utility/isNotMatching";
import { isEmpty } from "@/utility/isEmpty";
//store
import { alertAtom } from "store/atom";

export default function SignUp() {
    const router = useRouter()
    const [_, setAlert] = useAtom(alertAtom)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    async function handleSignUp() {
        try {
            const res = await fetch('http://localhost:3001/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            })

            if (res.ok) router.push('/signin')

            const { error, message } = await res.json()
            throw `${error}: ${message}`

        } catch (error: any) {
            setAlert(error)
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
                handleClick={handleSignUp}
            />
        </div>
    )
}