const url = 'http://localhost:3001/auth/google/signin'

export default async (req: any, res: any) => {
    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body),
    }

    try {
        const response = await fetch(url, reqObj)
        const result = await response.json()
        res.status(2001).json(result)
    }
    catch (error) {
        console.log('failed to sign in')
        res.status(500)
    }
}