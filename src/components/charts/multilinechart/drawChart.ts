import * as d3 from 'd3';
import { ScaleTime, ScaleLinear, ScaleOrdinal, Line, Selection, DSVRowString, Axis } from 'd3';

export const drawChart = (data) => {
    // Data
    const fields: any = Object.keys(data[0]);
    const objKey = fields[0];
    const objX = fields[1];
    const objY = fields[2];

    const dataGroup: any = d3.nest().key((d) => d[objKey]).entries(data);

    // Margins
    const margins = { top: 20, right: 80, bottom: 30, left: 50 };
    
    const svg: Selection<Element, {}, HTMLElement, any> = d3.select("#chart");

    let xScale: ScaleTime<number, number> = d3.scaleTime();
    let yScale: ScaleLinear<number, number> = d3.scaleLinear();
    xScale.domain(d3.extent(data, (d) => +d[objX]));
    yScale.domain(d3.extent(data, (d) => +d[objY]));
    let xAxis: Axis<{}> = d3.axisBottom(xScale);
    let yAxis: Axis<{}> = d3.axisLeft(yScale);

    const lineGen: Line<[number, number]> = d3.line().curve(d3.curveBasis).x((d) => xScale(d[objX])).y((d) => yScale(d[objY]));

    // Define responsive behavior
    function resize() {
        let width = parseInt(d3.select("#chart").style("width")) - margins.left - margins.right;
        let height = parseInt(d3.select("#chart").style("height")) - margins.top - margins.bottom;

        // Update the range of the scale with new width/height
        xScale.range([margins.left, width]);
        yScale.range([height- margins.bottom, 0]);

        // Update the axis and text with the new scale
        

        // Force D3 to recalculate and update the line
        svg.attr("width", width);
        svg.attr("height", height);

        svg.append("svg:g")
            .attr("transform", "translate(0," + (height - margins.bottom) + ")")
            .call(xAxis) // Drawing axis X
            .append("text")
            .attr("x", width)
            .attr("fill", "#000")
            .text(objX); // Text column X

        svg.append("svg:g")
            .attr("transform", "translate(" + (margins.left) + ",0)")
            .call(yAxis) // Drawing axis Y
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("fill", "#000")
            .text(objY); // Text column Y

        dataGroup.forEach((d, i) => {
            svg.append('svg:path')
                .attr('d', lineGen(d.values))
                .attr('stroke', (d, j) => "hsl(" + Math.random() * 360 + ",100%,50%)")
                .attr('stroke-width', 2)
                .attr('fill', 'none');
            svg.append('svg:text')
                .attr("transform", "translate(" + xScale(d.values[d.values.length - 1][objX]) + "," + yScale(d.values[d.values.length - 1][objY]) + ")")
                .style("font", "10px sans-serif")
                .text(d.key); // Showing data keys
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