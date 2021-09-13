const url = 'http://localhost:3001/primetime/test/tempData'

export default async (req: any, res: any) => {
    let data;

    try {
        const response = await fetch(url)
        data = await response.json()
    }
    catch (error) {
        data = { error: 'Internal Server Error', message: error }
    }

    res.status(200).json(data)
}