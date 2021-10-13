const googleUrl = 'http://localhost:3001/auth/google/signin'
const regularUrl = 'http://localhost:3001/auth/signin'

export default async (req: any, res: any) => {
    const { type, username, password, tokenId } = req.body
    const url = type === 'regular' ? regularUrl : googleUrl
    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, tokenId }),
    }

    try {
        const response = await fetch(url, reqObj)
        const result = await response.json()
        res.status(201).json(result)
    }
    catch (error) {
        res.status(500).json(error)
    }
}