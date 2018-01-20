import * as d3 from 'd3';
import { ScaleTime, ScaleLinear, ScaleOrdinal, Line, Selection, DSVRowString, Axis } from 'd3';

export const drawChart = (data, legendAxisY, heightUser) => {

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

    // Lines
    const lineGen: Line<[number, number]> = d3.line().curve(d3.curveBasis).x((d) => xScale(d[objX])).y((d) => yScale(d[objY]));

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
        .attr("y",10)
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