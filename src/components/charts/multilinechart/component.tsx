import * as React from 'react';
import * as d3 from 'd3';
import { ScaleTime, ScaleLinear, ScaleOrdinal, Line, Selection, DSVRowString, Axis } from 'd3';

interface Props {
    tsvPath: string;
    width: string;
    height: string;
}

export class MultiLineChart extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const data = [{
            "Client": "Ericsson",
            "year": "2000",
            "sale": "202",
        }, {
            "Client": "Ericsson",
            "year": "2002",
            "sale": "215",
        }, {
            "Client": "Ericsson",
            "year": "2004",
            "sale": "179",
        }, {
            "Client": "Ericsson",
            "year": "2006",
            "sale": "199",
        }, {
            "Client": "Ericsson",
            "year": "2008",
            "sale": "134",
        }, {
            "Client": "Ericsson",
            "year": "2010",
            "sale": "176",
        }, {
            "Client": "Huawei",
            "year": "2000",
            "sale": "100",
        }, {
            "Client": "Huawei",
            "year": "2002",
            "sale": "215",
        }, {
            "Client": "Huawei",
            "year": "2004",
            "sale": "179",
        }, {
            "Client": "Huawei",
            "year": "2006",
            "sale": "199",
        }, {
            "Client": "Huawei",
            "year": "2008",
            "sale": "134",
        }, {
            "Client": "Huawei",
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
            right: 60,
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

        console.log(data);

        d3.tsv(this.props.tsvPath, (error, data) => {
            console.log(data);
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