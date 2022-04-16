import * as d3 from "d3"
import { useRef, useEffect } from "react"

export default function LineGraph(props: {data: number[]}) {
    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        const height= 100
        const width = 100

        if (!props.data) return
        if (!d3.min(props.data) || !d3.max(props.data)) return
 
        const linearScale = d3.scaleLinear()
                                .domain([d3.min(props.data) as number, d3.max(props.data) as number])
                                .range([0, height])
        const svg = d3.select(svgRef.current)
                        .attr("width", "100%")
                        .attr("height", "100%")
                        .attr("viewBox", "0 0 100 100")
        const g = svg.selectAll("g")
            .data(props.data)
            .enter()
            .append("g")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("transform", (d, i) => {
                return `translate(${i * (width / props.data.length)}, 0)`
            })
        const line = g.append("line")
                        .attr("x1", "0")
                        .attr("x2", width / props.data.length)
                        .attr("y1", (d, i) => linearScale(d))
                        .attr("y2", (d, i) => linearScale(props.data[i+1]))
                        .attr("stroke", "black")
        line
    }, [])

    return (
        <svg ref={svgRef} width="100%" height="100%"/>
    )
}