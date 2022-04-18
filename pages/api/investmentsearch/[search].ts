import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface ResultData {
    "1. symbol": string,
    "2. name": string,
    "3. type": string,
    "4. region": string,
    "5. marketOpen": string,
    "6. marketClose": string,
    "7. timezone": string,
    "8. currency": string,
    "9. matchScore": string
}
type SearchResults = {
    name: string,
    symbol: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { search } = req.query
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE}`
    const data = await axios.get(url)
    const result = data.data["bestMatches"].reduce( (prev: SearchResults[], curr: ResultData) : SearchResults[] => {
        return [...prev, { name: curr["2. name"], symbol: curr["1. symbol"] }]
    }, [])
    res.send(result)
}