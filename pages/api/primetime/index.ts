const baseUrl = 'http://localhost:3001/primetime'

export default async function handler(req: any, res: any) {
    //create a primetime
    if (req.method === 'POST') {
        let data;
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body),
        }
        try {
            const response = await fetch(baseUrl, reqObj)
            data = await response.json()
            res.status(200).json(data)
        }
        catch (error) {
            console.error('Internal Server Error', error)
        }
    }
    //Get all primetime
    if (req.method === 'GET') {
        try {
            const response = await fetch(baseUrl)
            const result = await response.json()
            res.status(200).json(result)
        }
        catch (error) {
            console.log('Internal Server Error')
        }
    }
}