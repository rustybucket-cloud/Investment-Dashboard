import * as d3 from "d3"
import { useRef, useEffect, useState } from "react"

export default function LineGraph({data} : { data: { date: string, price: string }[] }) {
    const svgRef = useRef<SVGSVGElement>(null)
    const [ values, setValues ] = useState<number[] | null>(null)

    useEffect(() => {
        const prices = data.map(item => parseFloat(item.price))
        setValues(prices)
    }, [data])

    useEffect(() => {
        const height= 100
        const width = 100

        if (!values) return
        if (!d3.min(values) || !d3.max(values)) return
 
        const linearScale = d3.scaleLinear()
                                .domain([d3.min(values) as number, d3.max(values) as number])
                                .range([0, height])
        const svg = d3.select(svgRef.current)
                        .attr("width", "100%")
                        .attr("height", "100%")
                        .attr("viewBox", "0 0 100 100")
        const g = svg.selectAll("g")
            .data(values)
            .enter()
            .append("g")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("transform", (d, i) => {
                return `translate(${i * (width / values.length)}, 0)`
            })
        const line = g.append("line")
                        .attr("x1", "0")
                        .attr("x2", width / values.length)
                        .attr("y1", (d, i) => linearScale(d))
                        .attr("y2", (d, i) => linearScale(values[i+1]))
                        .attr("stroke", "black")
        line
    }, [values])

    return (
        <svg ref={svgRef} width="100%" height="100%"/>
    )
}