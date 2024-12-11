import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const TweetVisualization = ({ data, colorBy, onTweetClick, selectedTweets }) => {
  const svgRef = useRef();
  const positionsRef = useRef(null);
  const sampledDataRef = useRef([]); 

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const months = ["March", "April", "May"];
    if (sampledDataRef.current.length === 0) {
      const sampledData = d3.shuffle(data.filter(d => months.includes(d.Month)))
        .slice(0, 300); 
      sampledDataRef.current = sampledData;
    }

    const sampledData = sampledDataRef.current;

    const sentimentColorScale = d3
      .scaleLinear()
      .domain([-1, 0, 1])
      .range(["red", "#ECECEC", "green"]);

    const subjectivityColorScale = d3
      .scaleLinear()
      .domain([0, 1])
      .range(["#ECECEC", "#4467C4"]);

    const colorScale =
      colorBy === "Sentiment" ? sentimentColorScale : subjectivityColorScale;

    const yScale = d3
      .scaleBand()
      .domain(months)
      .range([margin.top, height - margin.bottom])
      .padding(0.5);

    if (!positionsRef.current) {
      const simulation = d3
        .forceSimulation(sampledData)
        .force("x", d3.forceX(width / 2).strength(0.015)) 
        .force("y", d3.forceY((d) => yScale(d.Month)).strength(0.1)) 
        .force("collide", d3.forceCollide(5)) 
        .stop();

      for (let i = 0; i < 300; i++) simulation.tick();

      positionsRef.current = sampledData.map(d => ({ x: d.x, y: d.y }));
    }

    svg
      .append("g")
      .selectAll("circle")
      .data(sampledData)
      .join("circle")
      .attr("cx", (d, i) => positionsRef.current[i].x) 
      .attr("cy", (d, i) => positionsRef.current[i].y)
      .attr("r", 5)
      .attr("fill", (d) => colorScale(d[colorBy]))
      .attr("stroke", (d) =>
        selectedTweets.includes(d) ? "black" : "none" 
      )
      .on("click", (event, d) => {
        event.stopPropagation(); 
        onTweetClick(d); 
      });

    svg
      .append("g")
      .selectAll("text")
      .data(months)
      .join("text")
      .attr("x", margin.left)
      .attr("y", (d) => yScale(d))
      .attr("text-anchor", "start")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text((d) => d);
  }, [data, colorBy, selectedTweets, onTweetClick]); 

  return <svg ref={svgRef} width={800} height={600}></svg>;
};

export default TweetVisualization;
