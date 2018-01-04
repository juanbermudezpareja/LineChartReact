import * as React from 'react';
import * as d3 from 'd3';
import { ScaleTime, ScaleLinear, ScaleOrdinal, Line, Selection, DSVRowString } from 'd3';

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
            "sale": "202",
            "year": "2000"
        }, {
            "Client": "ABC",
            "sale": "215",
            "year": "2002"
        }, {
            "Client": "ABC",
            "sale": "179",
            "year": "2004"
        }, {
            "Client": "ABC",
            "sale": "199",
            "year": "2006"
        }, {
            "Client": "ABC",
            "sale": "134",
            "year": "2008"
        }, {
            "Client": "ABC",
            "sale": "176",
            "year": "2010"
        }, {
            "Client": "XYZ",
            "sale": "100",
            "year": "2000"
        }, {
            "Client": "XYZ",
            "sale": "215",
            "year": "2002"
        }, {
            "Client": "XYZ",
            "sale": "179",
            "year": "2004"
        }, {
            "Client": "XYZ",
            "sale": "199",
            "year": "2006"
        }, {
            "Client": "XYZ",
            "sale": "134",
            "year": "2008"
        }, {
            "Client": "XYZ",
            "sale": "176",
            "year": "2013"
        }];

        var data1 = [{
            "sale": "202",
            "year": "2000"
        }, {
            "sale": "215",
            "year": "2001"
        }, {
            "sale": "179",
            "year": "2002"
        }, {
            "sale": "199",
            "year": "2003"
        }, {
            "sale": "134",
            "year": "2003"
        }, {
            "sale": "176",
            "year": "2010"
        }];

        const fields = Object.keys(data[0]);

        const dataGroup = d3.nest().key((d) => d[fields[0]]).entries(data);

        let vis = d3.select("#visualisation"),
            WIDTH = +this.props.width,
            HEIGHT = +this.props.height,
            MARGINS = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 50
            };
            
        const xScale = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([+d3.min(data, (d) => d[fields[2]]),+d3.max(data, (d) => d[fields[2]])]);
        const yScale = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([+d3.min(data, (d) => d[fields[1]]),+d3.max(data, (d) => d[fields[1]])]);
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        const lineGen = d3.line().curve(d3.curveBasis)
            .x((d) => xScale(d[fields[2]]))
            .y((d) => yScale(d[fields[1]]));

        vis.append("svg:g")
            .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
            .call(xAxis);

        vis.append("svg:g")
            .attr("transform", "translate(" + (MARGINS.left) + ",0)")
            .call(yAxis);

        dataGroup.forEach(function (d, i) {
            vis.append('svg:path')
                .attr('d', lineGen(d.values))
                .attr('stroke', (d, j) => "hsl(" + Math.random() * 360 + ",100%,50%)")
                .attr('stroke-width', 2)
                .attr('fill', 'none');
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