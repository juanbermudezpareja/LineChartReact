import * as d3 from 'd3';
import { ScaleTime, ScaleLinear, ScaleOrdinal, Line, Selection, DSVRowString, Axis } from 'd3';

export const drawChart = (data) => {

    const margins: any = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };
    const width = parseInt(d3.select("#chart").style("width")) - margins.left - margins.right;
    const height = parseInt(d3.select("#chart").style("height")) - margins.top - margins.bottom;

    console.log(width)
    console.log(height)

    const fields: any = Object.keys(data[0]);
    const objKey = fields[0];
    const objX = fields[1];
    const objY = fields[2];

    const dataGroup: any = d3.nest().key((d) => d[objKey]).entries(data);

    const svg: Selection<Element, {}, HTMLElement, any> = d3.select("#chart");

    const xScale: ScaleTime<number, number> = d3.scaleTime().range([margins.left, width - margins.right - margins.left]).domain([+d3.min(data, (d) => d[objX]), +d3.max(data, (d) => d[objX])]);
    const yScale: ScaleLinear<number, number> = d3.scaleLinear().range([height - margins.top, margins.bottom]).domain([+d3.min(data, (d) => d[objY]), +d3.max(data, (d) => d[objY])]);
    const xAxis: Axis<{}> = d3.axisBottom(xScale);
    const yAxis: Axis<{}> = d3.axisLeft(yScale);

    const lineGen: Line<[number, number]> = d3.line().curve(d3.curveBasis).x((d) => xScale(d[objX])).y((d) => yScale(d[objY]));

    svg.attr("width", width + margins.left + margins.right);
    svg.attr("height", height + margins.top + margins.bottom);

    svg.append("svg:g")
        .attr("transform", "translate(0," + (height - margins.bottom) + ")")
        .call(xAxis) // Drawing axis X
        .append("text")
        .attr("x", "555")
        .attr("fill", "#000")
        .text(objX); // Text column X

    svg.append("svg:g")
        .attr("transform", "translate(" + (margins.left) + ",0)")
        .call(yAxis) // Drawing axis Y
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .text(objY); // Text column Y

    // dataGroup.forEach((d, i) => {
    //     svg.append('svg:path')
    //         .attr('d', lineGen(d.values))
    //         .attr('stroke', (d, j) => "hsl(" + Math.random() * 360 + ",100%,50%)")
    //         .attr('stroke-width', 2)
    //         .attr('fill', 'none');
    //     svg.append('svg:text')
    //         .attr("transform", "translate(" + xScale(d.values[d.values.length - 1][objX]) + "," + yScale(d.values[d.values.length - 1][objY]) + ")")
    //         .style("font", "10px sans-serif")
    //         .text(d.key); // Showing data keys
    // });


    // Define responsive behavior
    function resize() {
        var width = parseInt(d3.select("#chart").style("width")) - margins.left - margins.right,
            height = parseInt(d3.select("#chart").style("height")) - margins.top - margins.bottom;

        // Update the range of the scale with new width/height
        xScale.range([0, width]);
        yScale.range([height, 0]);

        // Update the axis and text with the new scale
        svg.select('.x.axis')
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.select('.y.axis')
            .call(yAxis);

        // Force D3 to recalculate and update the line
        dataGroup.forEach((d, i) => {
            svg.append('svg:path')
                .attr('d', lineGen(d.values))
                .attr('stroke', (d, j) => "hsl(" + Math.random() * 360 + ",100%,50%)")
                .attr('stroke-width', 2)
                .attr('fill', 'none');
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