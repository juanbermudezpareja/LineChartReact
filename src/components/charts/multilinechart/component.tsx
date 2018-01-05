import * as React from 'react';
import * as d3 from 'd3';
import { ScaleTime, ScaleLinear, ScaleOrdinal, Line, Selection, DSVRowString, Axis } from 'd3';

interface Props {
    tsvPath: string;
    yAxisLabel: string;
    width: string;
    height: string;
}

export class MultiLineChart extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const data = [{
            "Client": "ABC",
            "year": "2000",
            "sale": "202",
        }, {
            "Client": "ABC",
            "year": "2002",
            "sale": "215",
        }, {
            "Client": "ABC",
            "year": "2004",
            "sale": "179",
        }, {
            "Client": "ABC",
            "year": "2006",
            "sale": "199",
        }, {
            "Client": "ABC",
            "year": "2008",
            "sale": "134",
        }, {
            "Client": "ABC",
            "year": "2010",
            "sale": "176",
        }, {
            "Client": "XYZ",
            "year": "2000",
            "sale": "100",
        }, {
            "Client": "XYZ",
            "year": "2002",
            "sale": "215",
        }, {
            "Client": "XYZ",
            "year": "2004",
            "sale": "179",
        }, {
            "Client": "XYZ",
            "year": "2006",
            "sale": "199",
        }, {
            "Client": "XYZ",
            "year": "2008",
            "sale": "134",
        }, {
            "Client": "XYZ",
            "year": "2013",
            "sale": "176",
        }];

        const fields: any = Object.keys(data[0]);
        const objKey = fields[0];
        const objX = fields[1];
        const objY = fields[2];

        const dataGroup: any = d3.nest().key((d) => d[objKey]).entries(data);

        const vis: Selection<Element, {}, HTMLElement, any> = d3.select("#visualisation");

        const margins: any = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        };

        const xScale: ScaleLinear<number, number> = d3.scaleLinear().range([margins.left, +this.props.width - margins.right]).domain([d3.min(data, (d) => d[objX]), d3.max(data, (d) => d[objX])]);
        const yScale: ScaleLinear<number, number> = d3.scaleLinear().range([+this.props.height - margins.top, margins.bottom]).domain([d3.min(data, (d) => d[objY]), d3.max(data, (d) => d[objY])]);
        const xAxis: Axis<{}> = d3.axisBottom(xScale);
        const yAxis: Axis<{}> = d3.axisLeft(yScale);

        const lineGen: Line<[number, number]> = d3.line().curve(d3.curveBasis)
            .x((d) => xScale(d[objX]))
            .y((d) => yScale(d[objY]));

        vis.append("svg:g")
            .attr("transform", "translate(0," + (+this.props.height - margins.bottom) + ")")
            .call(xAxis)
            .append("text")            
            .attr("y", "-4")
            .attr("dx", "58em")
            .attr("fill", "#000")
            .text(objX);

        vis.append("svg:g")
            .attr("transform", "translate(" + (margins.left) + ",0)")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("fill", "#000")
            .text(objY);

  

        dataGroup.forEach((d, i) => {
            vis.append('svg:path')
                .attr('d', lineGen(d.values))
                .attr('stroke', (d, j) => "hsl(" + Math.random() * 360 + ",100%,50%)")
                .attr('stroke-width', 2)
                .attr('fill', 'none')            
        });
    }
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <svg id="visualisation" width={this.props.width} height={this.props.height} ></svg>
                </div>
            </div>
        );
    }
}