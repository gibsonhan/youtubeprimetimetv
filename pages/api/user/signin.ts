const googleUrl = 'http://localhost:3001/auth/google/signin'
const regularUrl = 'http://localhost:3001/auth/signin'

//Need to figure out how to deal with the api.
//should I use the nextjs api to 
//currently using the frontend to send direct request too -> server
// hover in the futeure I want to  client ---> nextjs server -----> nestjs server
// is session next?
export default async (req: any, res: any) => {
    const { type, username, password, tokenId } = req.body
    const url = type === 'regular' ? regularUrl : googleUrl
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, password, tokenId })
        })
        console.log(response)
        res.setHeader('set-cookie', 'hello=world')
        res.status(201)
    }
    catch (error) {
        console.log(error)
        res.status(500)
    }
}