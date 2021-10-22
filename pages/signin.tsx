import { useAtom } from 'jotai'
import { useRouter } from "next/router";
import { useState } from "react";
//components
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import YoutubeSignIn from "@/components/youtube/YoutubeSignIn";
//store
import { alertAtom, signedInAtom } from "@store/atom";

export default function SignIn() {
    const router = useRouter()
    const [_, setAlert] = useAtom(alertAtom)
    const [, setUserSignedIn] = useAtom(signedInAtom)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignIn() {
        try {
            const url = 'http://localhost:3001/auth/signin'
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            })

            if (res.ok) {
                setUserSignedIn(true)
                router.push('/primetime');
            } 
            else {
                const { error, message } = await res.json();
                throw `${error} ${message}`
            }
        }
        catch (error: any) {
            setAlert(error)
        }
    }

    function handleCreateAccount() {
        router.push('/signup')
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
            <Button
                title='Create an Account'
                disable={false}
                isVisible={true}
                handleClick={handleCreateAccount} />
        </div>
    )
}