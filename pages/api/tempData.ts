const url = 'http://localhost:3001/primetime/test/tempData'

export default async (req: any, res: any) => {
    try {
        const response = await fetch(url)
        const result = await response.json()
        res.status(200).json({ data: result })
    }
    catch (error) {
        console.error('Internal Service Error')
    }
}