import YoutubeSignIn from "@/components/youtube/YoutubeSignIn"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Landing() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (isLoggedIn) router.push('/primetime/all')
    }, [])

    return (
        <div className="flex flex-col justify-center items-center">
            <YoutubeSignIn />
        </div>
    )
}