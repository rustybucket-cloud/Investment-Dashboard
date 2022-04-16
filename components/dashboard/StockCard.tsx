import { Card, Button } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"

import LineGraph from "./LineGraph"

const data = [
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
]

export default function StockCard(props: {name: string, symbol: string}) {
    useEffect( () => {

    }, [])

    return (
        <Card className="border-0 shadow col-11 col-sm-5 col-xl-3 m-2 p-0" style={{maxWidth: "32rem"}}>
            <Card.Title className="bg-primary text-white p-1">{props.name}</Card.Title>
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
                    <LineGraph data={data} />
            </Card.Body>
        </Card>
    )
}