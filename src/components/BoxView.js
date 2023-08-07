import * as d3 from "d3";
import React, { useRef, useEffect } from 'react';
import '../App.css';
import overdoseData from '../drug_overdose_data.json';
import { Tooltip } from "@mui/material";

overdoseData.forEach(d => {
    d.YEAR = new Date(d.YEAR)
    d.SYRINGE_RATE = +d.SYRINGE_RATE
    d.FACILITY_RATE = +d.FACILITY_RATE
    d.OVERDOSE_RATE = +d.OVERDOSE_RATE
})

const dims = {
    height: 750,
    width: 900,
}

const margins = {
    left: 50,
    right: 50,
    top: 10,
    bottom: 35,}

function getStateStats() {
    const states = [...new Set(overdoseData.map(d => d.STATE))];

  function getMedian(overdoseRates) {
    let median;
    const length = overdoseRates.length;
    if (length % 2 === 0) {
      const midIndex = length / 2;
      median = (overdoseRates[midIndex - 1] + overdoseRates[midIndex]) / 2;
    } else {
      median = overdoseRates[Math.floor(length / 2)];
    }
    return median
  }

  function getMean(overdoseRates) {
    const length = overdoseRates.length;
    const avg = overdoseRates.reduce(function(sum, d) {
      return sum + d
    }, 0) / length
    return avg
  }

  // change this to reduce
  let stateStats = [];
  states.forEach((state, i) => {
    const stateData = overdoseData.filter(d => d.STATE === state);
    const overdoseRates = stateData.map(obj => obj.OVERDOSE_RATE);
    overdoseRates.sort((a, b) => a - b);
    const length = overdoseRates.length
    const median = getMedian(overdoseRates)
    const mean = getMean(overdoseRates)
    const twofive = overdoseRates[Math.floor(length / 4)]
    const sevenfive = overdoseRates[Math.floor(3 * length / 4)]
    const min = overdoseRates[0]
    const max = overdoseRates[length - 1]
    let obj = {
      "state": state,
      "median": median,
      "mean": mean,
      "q1": twofive,
      "q3": sevenfive,
      "min": min,
      "max": max
    }
    stateStats.push(obj)
  })
  return stateStats
}

const stateStats = getStateStats()
console.log(stateStats);

const yScale = d3
.scaleBand()
.domain(overdoseData.map(d => d.STATE))
.range([dims.height - margins.bottom, margins.top])
.padding(0.2);
  
const xScale = d3
.scaleLinear()
.domain([d3.min(overdoseData, d => d.OVERDOSE_RATE), d3.max(overdoseData, d => d.OVERDOSE_RATE)])
.range([margins.left, dims.width - margins.right]);



export default function BoxView(props) {
    console.log(props)
    const chartRef = useRef(null);

    useEffect(() => {
        let svg;
        let g;

        svg = d3.select(chartRef.current);

        svg.selectAll("*").remove();

        svg.attr("width", dims.width)
            .attr("viewBox", [0, 0, dims.width, dims.height])
            .attr("style", "max-width: 100%");
        
            
        g = svg
            .append("g")
            .attr("transform", "translate(" + margins.left + "," + margins.top + ")");
            
        g.append('g').call(d3.axisBottom(xScale))
            .attr('transform', `translate(0, ${dims.height - margins.bottom})`)

        g.append("text")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("y", dims.height -10 )
            .attr("x", dims.width / 2)
            .text(
                "Median drug overdose death rate per 100k people"
            )
            .style("text-anchor", "middle")
            .attr("font-family", "Inter-Bold");
    }, []);

    useEffect(() => {
        let currData = stateStats;
        
        
        switch (props.selectedSort) {
            case ('median-ascending'):
                console.log("asc sort")
                currData.sort(function (a, b) {
                    console.log("medians: ", a.median, b.median)
                    return b.median - a.median;
                })
                break;
            case ('median-descending'):
                console.log("desc sort")
                currData.sort(function (a, b) {
                    console.log("medians: ", a.median, b.median)
                    return a.median - b.median;
                })
                break;
            default:
                console.log("default")
                currData.sort(function (a, b) {
                    console.log("states: ", a.state, b.state)
                    return a.state.localeCompare(b.state);;
                })
                break;
        }
      
        yScale.domain(currData.map(d => d.state))
            
        d3.select(chartRef.current).selectAll(".y-axis").remove();
        let g = d3.select(chartRef.current).select("g");
        
        g.append('g').call(d3.axisLeft(yScale))
            .attr('class', 'y-axis')
            .attr('transform', `translate(${margins.left}, 0)`);

        g.selectAll('.whisker')
            .data(currData)
            .join(
                enter => enter.append('line')
                    .attr('class', 'whisker')
                    .attr('y1', d => yScale(d.state) + yScale.bandwidth() / 2)
                    .attr('x1', d => xScale(d.min))
                    .attr('y2', d => yScale(d.state) + yScale.bandwidth() / 2)
                    .attr('x2', d => xScale(d.max))
                    .attr('stroke', 'grey')
                    .attr('stroke-width', '2'),
                update => update.transition()
                    .duration(1000)
                    .attr('y1', d => yScale(d.state) + yScale.bandwidth() / 2)
                    .attr('x1', d => xScale(d.min))
                    .attr('y2', d => yScale(d.state) + yScale.bandwidth() / 2)
                    .attr('x2', d => xScale(d.max)),
                exit => exit.remove()
            )

            g.selectAll('.box-plot')
            .data(currData)
            .join(
                enter => enter.append('rect')
                    .attr('class', 'box-plot')
                    .attr('x', d => xScale(d.q1))
                    .attr('y', d => yScale(d.state))
                    .attr('width', d => xScale(d.q3) - xScale(d.q1))
                    .attr('height', d => yScale.bandwidth())
                    .attr('fill', '#d60063')
                    .attr('stroke', 'black'),
                update => update.transition()
                    .duration(1000)
                    .attr('x', d => xScale(d.q1))
                    .attr('y', d => yScale(d.state))
                    .attr('width', d => xScale(d.q3) - xScale(d.q1))
                    .attr('height', d => yScale.bandwidth()),
                exit => exit.remove()
            )
            .on("mouseenter", (event, d) => {
                // Show the Tooltip when mouse enters the state path
                const tooltip = d3.select(".tooltip");
                tooltip.style("visibility", "visible");
                tooltip.select(".state-name").text(d.state);
                tooltip.select(".median-rate").text(`min: ${d.min} | q1: ${d.q1} | median: ${d.median} | mean: ${d.mean} | q3: ${d.q3} | max: ${d.max}`);
              })
            .on("mousemove", (event, d) => {
                const [x, y] = [event.clientX, event.clientY]
                // Show the Tooltip at the adjusted position
                const tooltip = d3.select(".tooltip");
                tooltip.style("left", x + "px");
                tooltip.style("top", y + "px");        })
            .on("mouseleave", () => {
                // Hide the Tooltip when mouse leaves the state path
                const tooltip = d3.select(".tooltip");
                tooltip.style("visibility", "hidden");
            });

            g.selectAll('.median-line')
            .data(currData)
            .join(
                enter => enter.append('line')
                    .attr('class', 'median-line')
                    .attr('y1', d => yScale(d.state))
                    .attr('x1', d => xScale(d.median))
                    .attr('y2', d => yScale(d.state) + yScale.bandwidth())
                    .attr('x2', d => xScale(d.median))
                    .attr('stroke', 'black'),
                update => update.transition()
                    .attr('y1', d => yScale(d.state))
                    .attr('x1', d => xScale(d.median))
                    .attr('y2', d => yScale(d.state) + yScale.bandwidth())
                    .attr('x2', d => xScale(d.median)),
                exit => exit.remove(),
            )
    }, [props.selectedSort]);

    return (
        <div>
            <svg ref={chartRef}></svg>
            <Tooltip
            className="tooltip"
            open={false}
            style={{ position: "fixed", pointerEvents: "none" }}
            >
            <div>
                <p className="state-name"></p>
                <p className="median-rate"></p>
            </div>
            </Tooltip>
        </div>
    )
}