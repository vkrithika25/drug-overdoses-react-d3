import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import overdoseData from "../drug_overdose_data.json";
import "../App.css";
import { Tooltip } from "@mui/material";

const margins = {
  left: 35,
  right: 35,
  top: 10,
  bottom: 35,
};

const dims = {
  height: 575,
  width: 650,
};

const syringeData = overdoseData.map((d) => {
  return {
    year: new Date(d.YEAR),
    county: d.COUNTY,
    metric: "SYRINGE",
    metricRate: +d.SYRINGE_RATE,
    overdoseRate: +d.OVERDOSE_RATE,
  };
});

const facilityData = overdoseData.map((d) => {
  return {
    year: new Date(d.YEAR),
    county: d.COUNTY,
    metric: "FACILITY",
    metricRate: +d.FACILITY_RATE,
    overdoseRate: +d.OVERDOSE_RATE,
  };
});

const xScale = d3
.scaleLinear()
.domain(d3.extent(overdoseData, (d) => +d.FACILITY_RATE))
.range([margins.left, dims.width - margins.right - 10]);

const yScale = d3
.scaleLinear()
.domain(d3.extent(overdoseData, (d) => +d.OVERDOSE_RATE))
.range([dims.height - margins.bottom - margins.top, margins.bottom]);

const colorScale = d3
.scaleOrdinal()
.domain(["SYRINGE", "FACILITY"])
.range(["#ff7a00", "#d60063"]);

const allData = [...facilityData, ...syringeData];

export default function Scatterplot(props) {
  const chartRef = useRef(null);

  useEffect(() => {
    let svg;
    let g;

    svg = d3.select(chartRef.current);

    svg.selectAll("*").remove();

    svg.attr("width", dims.width)
      .attr("height", dims.height)
      .attr("viewBox", [0, 0, dims.width, dims.height])
      .attr("style", "max-width: 100%");

    g = svg
      .append("g")
      .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .attr("transform", `translate(${margins.left}, 0)`);

    g.append("g")
      .call(d3.axisBottom(xScale))
      .attr(
        "transform",
        `translate(0, ${dims.height - margins.top - margins.bottom})`
      );

    g.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 17)
      .attr("y", 30)
      .attr("x", dims.width / 2)
      .text("Scatterplot: Fatal Drug Overdoses and Substance Abuse/Syringe")
      .style("text-anchor", "middle")
      .attr("font-family", "Inter-Bold");

    g.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 17)
      .attr("y", 50)
      .attr("x", dims.width / 2)
      .text(" Exchange Facilities by US County in 2020")
      .style("text-anchor", "middle")
      .attr("font-family", "Inter-Bold");

    g.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("y", 650)
      .attr("x", -50)
      .text("Drug overdose/poisoning deaths in county per 100k people")
      .attr(
        "transform",
        `translate(${dims.width * -1}, ${dims.height / 2 - 50}) rotate(270)`
      )
      .style("text-anchor", "middle")
      .attr("font-family", "Inter-Bold");

    g.append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("y", dims.height - 13)
      .attr("x", dims.width / 2)
      .text(
        "Drug abuse facilities/syringe exchange facilities in the county per 10k people"
      )
      .style("text-anchor", "middle")
      .attr("font-family", "Inter-Bold");
  }, []);

  useEffect(() => {
    console.log("Updating the graph with colors " + props.selectedColors);

    let currData = allData.filter((d) => props.selectedColors.includes(d.metric));

    let g = d3.select(chartRef.current).select("g");

    g.selectAll("circle")
      .data(currData)
      .join("circle")
      .attr("cx", (d) => xScale(d.metricRate))
      .attr("cy", (d) => yScale(d.overdoseRate))
      .attr("r", 2.5)
      .attr("fill", (d) => colorScale(d.metric))
      .on("mouseenter", (event, d) => {
        // Show the Tooltip when mouse enters the state path
        const tooltip = d3.select(".tooltip");
        tooltip.style("visibility", "visible");
        tooltip.select(".county").text(d.county);
        tooltip.select(".rate")
          .text(`${d.metric.toLowerCase()} rate: ${d.metricRate}`);
        tooltip.select(".overdose")
          .text(`overdose rate: ${d.overdoseRate}`);
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
  }, [props.selectedColors]);

  return <div>
    <svg ref={chartRef}></svg>;
    <Tooltip
    className="tooltip"
    open={false}
    style={{ position: "fixed", pointerEvents: "none" }}
    >
    <div>
        <p className="county"></p>
        <p className="rate"></p>
        <p className="overdose"></p>
    </div>
    </Tooltip>
  </div>
}
