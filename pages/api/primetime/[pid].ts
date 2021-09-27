const baseUrl = 'http://localhost:3001/primetime'

export default async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const { pid } = req.query
        try {
            const url = baseUrl + '/' + pid
            const response = await fetch(url)
            const result = await response.json()
            res.status(200).json(result)
        }
        catch (error) {
            console.error('Internal Server Error Block')
            res.status(404).json({ message: 'Internal Server Error', error: true })
        }
    }

    if (req.method === 'PUT') {
        const reqObj = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body),
        }
        const url = baseUrl + `/${req.body.id}`
        try {
            const response = await fetch(url, reqObj)
            const result = await response.json()
            res.status(200).json(result)
        }
        catch (error) {
            console.error('Internal Server Error')
        }
    }

    if (req.method === 'DELETE') {
        const { pid } = req.query
        const reqObj = {
            method: 'DELETE',
        }
        try {
            const url = baseUrl + '/' + pid
            const response = await fetch(url, reqObj)
            const result = await response.json()
            res.status(200).json(result)
        }
        catch (error) {
            console.error('Internal Server Error Block')
            res.status(404).json({ message: 'Internal Server Error', error: true })
        }
    }
}