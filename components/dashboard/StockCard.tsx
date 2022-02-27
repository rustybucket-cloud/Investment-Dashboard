import { Card, Button } from "react-bootstrap"
import * as d3 from "d3"
import { useRef, useEffect } from "react"

export default function StockCard(props) {
    const svgRef = useRef<HTMLOrSVGElement>(null)

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
        3075.77]

    useEffect(() => {
        const svg = d3.select(svgRef.current)
                        .append("g")
                        .attr("width", data.length * 10)
                        .attr("height", data.length * 10)

        const line = svg.selectAll("line")
                        .data(data)
                        .enter()
                        .append("line")

        line.attr("x1", (d, i) => i)
            .attr("x2", (d: number, i) => i + 1)
            .attr("y1", (d, i) => d)
            .attr("y2", (d, i) => data[i+1])
    }, [])

    return (
        <Card className="border-0 shadow col-12 col-md-5 m-2 p-0" style={{maxWidth: "32rem"}}>
            <Card.Title className="bg-primary text-white p-1">{props.name}</Card.Title>
            <Card.Body>
                <svg ref={svgRef}/>
                <div className="d-flex justify-content-between">
                    <select>
                        <option>1D</option>
                        <option>5D</option>
                        <option>1M</option>
                        <option>3M</option>
                        <option>6M</option>
                        <option>1Y</option>
                        <option>5Y</option> 
                    </select>
                    
                </div>
                
            </Card.Body>
        </Card>
    )
}