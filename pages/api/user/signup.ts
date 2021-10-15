const googleUrl = 'http://localhost:3001/auth/google/signup'
const regualrUrl = 'http://localhost:3001/auth/signup'

export default async (req: any, res: any) => {
    const { username, password, type, idToken } = req.body
    const url = type === 'regular' ? regualrUrl : googleUrl
    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, idToken }),
    }

    try {
        await fetch(url, reqObj)
        res.status(201)
    }
    catch (error) {
        console.log(error)
        res.status(500)
    }
}