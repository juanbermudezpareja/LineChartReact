import * as d3 from 'd3';
import { ScaleTime, ScaleLinear, ScaleOrdinal, Line, Selection, DSVRowString, Axis } from 'd3';

export const drawChart = (data, legendAxisY, heightUser, dateFormat) => {

    // Data
    const fields: any = Object.keys(data[0]);
    const objKey = fields[0];
    const objX = fields[1];
    const objY = fields[2];

    const dataGroup: any = d3.nest().key((d) => d[objKey]).entries(data);

    // Margins
    const margins = { top: 20, right: 80, bottom: 30, left: 50 };
    let width = parseInt(d3.select("#chart").style("width")) - margins.left - margins.right;
    let height = heightUser - margins.top - margins.bottom;

    const svg: Selection<Element, {}, HTMLElement, any> = d3.select("#chart");
    svg.attr("height", height);

    // Scales, domain and axis
    const xScale: ScaleTime<number, number> = d3.scaleTime();
    const yScale: ScaleLinear<number, number> = d3.scaleLinear();
    xScale.domain(d3.extent(data, (d) => +d[objX]));
    yScale.domain(d3.extent(data, (d) => +d[objY]));
    xScale.range([margins.left, width]);
    yScale.range([height - margins.bottom, margins.top]);
    const xAxis: Axis<{}> = d3.axisBottom(xScale);
    const yAxis: Axis<{}> = d3.axisLeft(yScale);

    const parseTime = d3.timeFormat(dateFormat);

    // Lines
    const lineGen: Line<[number, number]> = d3.line().x((d) => xScale(d[objX])).y((d) => yScale(d[objY]));

    // Define the div for the tooltip
    const div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    svg.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - margins.bottom) + ")")
        .call(xAxis) // Drawing axis X

    svg.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (margins.left) + ",0)")
        .call(yAxis) // Drawing axis Y
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .attr("y", 10)
        .text(legendAxisY); // Text column Y

    dataGroup.forEach((d, i) => {
        svg.append('svg:path')
            .attr("class", "line" + i)
            .attr('d', lineGen(d.values)) // Drawing line
            .attr('stroke', (d, j) => "hsl(" + i * 50 % 360 + ",100%,50%)")  // Setting color
            .attr('stroke-width', 2)
            .attr('fill', 'none');
        svg.append('svg:text')
            .attr("class", "textKey" + i)
            .attr("transform", "translate(" + xScale(d.values[d.values.length - 1][objX]) + "," + yScale(d.values[d.values.length - 1][objY]) + ")")
            .style("font", "10px sans-serif")
            .text(d.key); // Showing data keys

        // Add the scatterplot
        svg.selectAll("dot")
            .data(d.values)
            .enter().append("circle")
            .attr("r", 5)
            .attr("class", "circle")
            .attr("opacity",0)
            .attr("cx", (d) => xScale(d[objX]))
            .attr("cy", (d) => yScale(d[objY]))
            .on("mouseover", (d) => {
                div.style("opacity", 0.8);
                div.html("<b>Date: </b>" + parseTime(d[objX]) + "<br/><b>" + legendAxisY + ":</b> " + d[objY])
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", (d) => {
                div.style("opacity", 0);
            });
    });

    // Responsive behavior
    function resize() {
        width = parseInt(d3.select("#chart").style("width")) - margins.left - margins.right;
        height = heightUser - margins.top - margins.bottom;

        // Update the range of the scale with new width/height
        xScale.range([margins.left, width]);
        yScale.range([height - margins.bottom, margins.top]);

        // Update the axis and text with the new scale
        svg.select('.x.axis')
            .attr("transform", "translate(0," + (height - margins.bottom) + ")")
            .call(xAxis);
        svg.select('.y.axis')
            .call(yAxis);

        // Force D3 to recalculate and update the line and text keys
        dataGroup.forEach((d, i) => {
            svg.select('.line' + i)
                .attr('d', lineGen(d.values));
            svg.select(".textKey" + i)
                .attr("transform", "translate(" + xScale(d.values[d.values.length - 1][objX]) + "," + yScale(d.values[d.values.length - 1][objY]) + ")");

            // Add the scatterplot
            svg.selectAll(".circle")
                .attr("cx", (d) => xScale(d[objX]))
                .attr("cy", (d) => yScale(d[objY]))
                .on("mouseover", (d) => {
                    div.style("opacity", .8);
                    div.html("<b>Date: </b>" + parseTime(d[objX]) + "<br/><b>" + legendAxisY + ":</b> " + d[objY])
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", (d) => {
                    div.style("opacity", 0);
                });
        });

        // Update the tick marks
        xAxis.ticks(Math.max(width / 75, 2));
        yAxis.ticks(Math.max(height / 50, 2));

    };

    // Call the resize function whenever a resize event occurs
    d3.select(window).on('resize', resize);

    // Call the resize function
    resize();
}