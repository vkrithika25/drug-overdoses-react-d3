import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import overdoseData from '../drug_overdose_data.json'
import '../App.css'
import statesGeoJson from '../us-states-1.json'
import { Tooltip } from '@mui/material';



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
    const stateStats = states.reduce((stats, state, i) => {
        const stateData = overdoseData.filter((d) => (d.STATE === state && d.OVERDOSE_RATE));
        const overdoseRates = stateData.map(obj => +obj.OVERDOSE_RATE);
        overdoseRates.sort((a, b) => a - b);
        const length = overdoseRates.length
        const median = getMedian(overdoseRates)
        const mean = getMean(overdoseRates)
        const twofive = overdoseRates[Math.floor(length / 4)]
        const sevenfive = overdoseRates[Math.floor(3 * length / 4)]
        const min = overdoseRates[0]
        const max = overdoseRates[length - 1]
        console.log(state, overdoseRates, median)
        let obj = {
        "state": state,
        "median": median,
        "mean": mean,
        "q1": twofive,
        "q3": sevenfive,
        "min": min,
        "max": max
        }
        stats.push(obj)
        return stats
    }, [])
    return stateStats
}

export default function Map(props) {
    const chartRef = useRef(null);
    const stateStats = getStateStats();
    console.log(stateStats)
    useEffect(() => {
      const svg = d3
        .select(chartRef.current)
        .attr("width", props.dims.width)
        .attr("height", props.dims.height)
        .attr("viewBox", [0, 0, props.dims.width, props.dims.height])
        .attr("style", "max-width: 100%;");
    
      // append a group element to the svg and offset it by the top and left margins
      const g = svg
        .append("g")
        .attr(
          "transform",
          "translate(" + props.margins.left + "," + props.margins.top + ")"
      );
    
       statesGeoJson.features.forEach((d) => {
        const state = d.properties.name;
        const stat = stateStats.filter((x) => (x.state === state));
        if (stat.length !== 0) {
          const median = stat[0].median;
          d.properties.median = median;      
        }
      });
    
      const projection = d3.geoAlbersUsa()
        .fitSize([props.dims.width - props.margins.right - props.margins.left, props.dims.height - props.margins.bottom], statesGeoJson);
    
      let geoGenerator = d3.geoPath()
        .projection(projection);
    
      const colorScale = d3.scaleSequential(["#ffe6ee", "#D60063"])
        .domain(d3.extent(stateStats, d => (d.median)));
    
    
      g.selectAll("path")
        .data(statesGeoJson.features)
        .enter()
        .append("path")
        .attr("d", geoGenerator)
        .attr("stroke", "#04052E")
        .attr("fill", (d) => {
          const color = (d.properties.median === undefined) ? "#ffffff" : String(colorScale(d.properties.median));
          return color;
        })
        .on("mouseenter", (event, d) => {
          // Show the Tooltip when mouse enters the state path
          const tooltip = d3.select(".tooltip");
          tooltip.style("visibility", "visible");
          tooltip.select(".state-name").text(d.properties.name);
          tooltip.select(".median-rate").text(`Median Overdose Rate: ${d.properties.median || "N/A"}`);
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
      
      g.append('text')
        .attr("y", 10)
        .attr("x", props.dims.width / 2)
        .attr("font-size", 17)
        .text("Median Fatal Overdose Rate by State")
        .style("text-anchor", "middle")
        .attr("font-family", "Inter-Bold");
        
      const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "0%");
    
      // Define the color stops for the gradient
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", '#ffe6ee');
    
      gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", '#D60063');

      svg.append("rect")
      .attr("x", props.dims.width / 2 - 100)
      .attr("y", ((7 * props.dims.height) / 8) + 15)
      .attr("width", 200)
      .attr("height", 15)
      .attr("stroke", "black")
      .style("fill", "url(#gradient)");

      svg.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("y", ((7 * props.dims.height) / 8) + 40)
      .attr("x", props.dims.width / 2 - 100)
      .text(`${d3.extent(stateStats, d => (d.median))[0]}`);

      svg.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("y", ((7 * props.dims.height) / 8) + 25)
      .attr("x", props.dims.width / 2 - 170)
      .text("Median Overdose Rates")
      .style("text-anchor", "middle")
      .attr("font-family", "Inter-Bold");

      svg.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("y", ((7 * props.dims.height) / 8) + 40)
      .attr("x", props.dims.width / 2 + 100)
      .text(`${d3.extent(stateStats, d => (d.median))[1]}`);


    }, [props.data, props.dims, props.margins, stateStats])

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

    );   
}