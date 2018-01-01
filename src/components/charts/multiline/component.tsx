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
        const svg: any = d3.select("svg");
        const margin: any = { top: 20, right: 80, bottom: 30, left: 50 };
        const width: number = svg.attr('width') - margin.left - margin.right;
        const height: number = svg.attr('height') - margin.top - margin.bottom;
        const g: any = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const parseTime = d3.timeParse("%Y%m%d");

        const x: ScaleTime<number, number> = d3.scaleTime().range([0, width]);
        const y: ScaleLinear<number, number> = d3.scaleLinear().range([height, 0]);
        const z: ScaleOrdinal<string, string> = d3.scaleOrdinal(d3.schemeCategory10);

        const line: Line<[number, number]> = d3.line()
            .curve(d3.curveBasis)
            .x((d: [number, number]) => x(d["axisX"]))
            .y((d: [number, number]) => y(d["axisY"]));

        d3.tsv(this.props.tsvPath, type, (error, data) => {
            if (error) throw error;

            const axisXColName = data.columns[0];

            const dataColumns = data.columns.slice(1).map((id) => {
                return {
                    id: id,
                    values: data.map((value, index, array) => { return { axisX: value[axisXColName], axisY: value[id] }; })
                };
            });

            x.domain(d3.extent(data, (d) => d[axisXColName]));

            y.domain([
                d3.min(dataColumns, (c) => d3.min(c.values, (d) => d.axisY)),
                d3.max(dataColumns, (c) => d3.max(c.values, (d) => d.axisY))
            ]);

            z.domain(dataColumns.map((c) => c.id));

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("fill", "#000")
                .text(this.props.yAxisLabel);

            const dataCol = g.selectAll(".dataCol")
                .data(dataColumns)
                .enter().append("g")
                .attr("class", "dataCol");

            dataCol.append("path")
                .attr("class", "line")
                .attr("d", (d) => line(d.values))
                .style("stroke", (d) => z(d.id));

            dataCol.append("text")
                .datum((d) => { return { id: d.id, value: d.values[d.values.length - 1] }; })
                .attr("transform", (d) => "translate(" + x(d.value.axisX) + "," + y(d.value.axisY) + ")")
                .attr("x", 3)
                .attr("dy", "0.35em")
                .style("font", "10px sans-serif")
                .text((d) => d.id);
        });

        function type(d, _, columns) {
            d[columns[0]] = parseTime(d[columns[0]]);
            for (let i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
            return d;
        }
    }
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <svg width={this.props.width} height={this.props.height} >
                        <g transform="translate(50,20)"></g>
                    </svg>
                </div>
            </div>
        );
    }
}