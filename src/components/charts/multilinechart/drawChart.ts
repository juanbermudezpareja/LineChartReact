import * as d3 from 'd3';
import { ScaleTime, ScaleLinear, ScaleOrdinal, Line, Selection, DSVRowString, Axis } from 'd3';

export const drawChart = (data, width, height) => {

    const fields: any = Object.keys(data[0]);
    const objKey = fields[0];
    const objX = fields[1];
    const objY = fields[2];

    const dataGroup: any = d3.nest().key((d) => d[objKey]).entries(data);
    const numDataAxisX = dataGroup[0].values.length > 10 ? 10 : dataGroup[0].values.length;

    const vis: Selection<Element, {}, HTMLElement, any> = d3.select("svg");

    const margins: any = {
        top: 20,
        right: 60,
        bottom: 20,
        left: 50
    };

    const xScale: ScaleLinear<number, number> = d3.scaleLinear().range([margins.left, width - margins.right]).domain([+d3.min(data, (d) => d[objX]), +d3.max(data, (d) => d[objX])]);
    const yScale: ScaleLinear<number, number> = d3.scaleLinear().range([height - margins.top, margins.bottom]).domain([+d3.min(data, (d) => d[objY]), +d3.max(data, (d) => d[objY])]);
    const xAxis: Axis<{}> = d3.axisBottom(xScale).ticks(numDataAxisX);
    const yAxis: Axis<{}> = d3.axisLeft(yScale);

    const lineGen: Line<[number, number]> = d3.line().curve(d3.curveBasis).x((d) => xScale(d[objX])).y((d) => yScale(d[objY]));

    vis.append("svg:g")
        .attr("transform", "translate(0," + (height - margins.bottom) + ")")
        .call(xAxis) // Drawing axis X
        .append("text")
        .attr("x", "555")
        .attr("fill", "#000")
        .text(objX); // Text column X

    vis.append("svg:g")
        .attr("transform", "translate(" + (margins.left) + ",0)")
        .call(yAxis) // Drawing axis Y
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .text(objY); // Text column Y

    dataGroup.forEach((d, i) => {
        vis.append('svg:path')
            .attr('d', lineGen(d.values))
            .attr('stroke', (d, j) => "hsl(" + Math.random() * 360 + ",100%,50%)")
            .attr('stroke-width', 2)
            .attr('fill', 'none');
        vis.append('svg:text')
            .attr("transform", "translate(" + xScale(d.values[d.values.length - 1][objX]) + "," + yScale(d.values[d.values.length - 1][objY]) + ")")
            .style("font", "10px sans-serif")
            .text(d.key); // Showing data keys
    });
}