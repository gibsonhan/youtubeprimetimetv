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
}