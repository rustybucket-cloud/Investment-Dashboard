import { useState, useEffect } from "react";

export enum TimeSeries {
    Today = "today",
    Week = "week",
    Month = "month",
    SixMonths = "six months",
    Year = "year"
}

interface StockPrice {
    "1. open": string,
    "2. high": string,
    "3. low": string,
    "4. close": string,
    "5. volume": string
}

interface StockSearch {
    [key: string]: StockPrice
}

export function usePrice(stock : string, timeSeries : TimeSeries) {
    const [ price, setPrice ] = useState<{ date: string; price: string; }[] | null>(null)
    const [ url, setUrl ] = useState<string | null>(null)
    const [ numberOfSearchResults, setNumberOfSearchResults ] = useState<number | null>(null)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        setLoading(true)
        switch (timeSeries) {
            case "today":
                setUrl(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&outputsize=full&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE}`)
                setNumberOfSearchResults(8)
                break
            case "week":
                setUrl(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE}`)
                setNumberOfSearchResults(7)
                break
            case "month":
                setUrl(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${stock}&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE}`)
                setNumberOfSearchResults(8)
                break
            case "six months":
                setUrl(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock}&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE}`)
                setNumberOfSearchResults(6)
            case "year":
                setUrl(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock}&apikey=${process.env.NEXT_PUBLIC_ALPHAVANTAGE}`)
                setNumberOfSearchResults(12)
                break
        }
    }, [timeSeries, stock])

    useEffect(() => {
        if (!url || !numberOfSearchResults) return
        fetch(url)
            .then(response => response.json())
            .then((data : StockSearch) => {
                const keys = Object.keys(data)
                const series = data[keys[keys.length - 1]]
                let prices = []
                for (const [key, value] of Object.entries(series)) {
                    const price = value["4. close"]
                    console.log(price)
                    if (!price || !key) return
                    prices.push({ date: key, price })
                }
                setLoading(false)
                setPrice(prices)
            })
            .catch(err => console.error(err))
    }, [url, numberOfSearchResults])

    return { loading, price }
}