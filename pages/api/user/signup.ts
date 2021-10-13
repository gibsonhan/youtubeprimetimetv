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
        const response = await fetch(url, reqObj)
        const result = await response.json()
        res.status(201).json(result)
    }
    catch (error) {
        console.log('failed to sign in')
        res.status(500)
    }
}