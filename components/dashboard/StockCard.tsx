import { Card, Button } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import { usePrice, TimeSeries } from "../../hooks/usePrice"
import LineGraph from "./LineGraph"

/* const data = [
    3504.56,
    3389.79,
    3444.24,
    3400.35,
    3421.37,
    3334.34,
    3251.08,
    3242.76,
    2852.86,
    2879.56,
    3152.79,
    3065.87,
    3052.03,
    3075.77,
    3075.77
] */

export default function StockCard({name, symbol} : { name: string, symbol: string}) {
    const [ data, setData ] = useState<{ date: string, price: string}[] | null>(null)

    const { loading, price } = usePrice(name, TimeSeries.Week)

    useEffect( () => {

    }, [])

    return (
        <Card className="border-0 bg-background shadow col-11 col-sm-5 col-xl-3 m-2 p-0" style={{maxWidth: "32rem"}}>
            <Card.Body className="d-flex flex-column">
                    <select className="col-3">
                        <option>1D</option>
                        <option>5D</option>
                        <option>1M</option>
                        <option>3M</option>
                        <option>6M</option>
                        <option>1Y</option>
                        <option>5Y</option> 
                    </select>
                    { price && <LineGraph data={price} /> }
                    { !price && <p>Loading...</p>}
            </Card.Body>
            <Card.Title className="bg-primary text-white m-0 p-1">{name}</Card.Title>
        </Card>
    )
}