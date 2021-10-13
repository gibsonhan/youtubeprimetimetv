import Button from "@/components/common/Button"
import { useRouter } from "next/router"

export default function Landing() {
    const router = useRouter()
    const handleSignIn = () => router.push('/signin')
    const handleSignUp = () => router.push('/signup')

    return (
        <div className="flex flex-col flex-auto justify-end items-center mb-10">
            <Button
                title='Sign In'
                disable={false}
                isVisible={true}
                handleClick={handleSignIn}
            />
            <Button
                title='Sign Up'
                disable={false}
                isVisible={true}
                handleClick={handleSignUp}
            />
        </div>
    )
}