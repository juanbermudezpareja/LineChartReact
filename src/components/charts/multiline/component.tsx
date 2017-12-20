import * as React from 'react';
import * as d3 from 'd3';
import { MultiLineChartComponent } from './page';

interface Props {
    tsvPath: string;
    width: string;
    height: string;
}

interface State {

}

export class MultiLineChart extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const svg: any = d3.select("svg");
        const margin: any = { top: 20, right: 80, bottom: 30, left: 50 };
        const width: any = svg.attr('width') - margin.left - margin.right;
        const height: any = svg.attr('height') - margin.top - margin.bottom;
        const g: any = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const parseTime = d3.timeParse("%Y%m%d");

        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);
        const z = d3.scaleOrdinal(d3.schemeCategory10);

        const line = d3.line()
            .curve(d3.curveBasis)
            .x((d) => x(d["axisX"]))
            .y((d) => y(d["axisY"]));

        d3.tsv(this.props.tsvPath, type, function (error, data) {
            if (error) throw error;

            const axisXColName = data.columns[0];

            const dataColumns = data.columns.slice(1).map((id) => {
                return {
                    id: id,
                    values: data.map((value, index, array) => { return { axisX: value[axisXColName], axisY: value[id] }; })
                };
            });

            x.domain(d3.extent(data, function (d) { return d[axisXColName]; }));

            y.domain([
                d3.min(dataColumns, function (c) { return d3.min(c.values, function (d) { return d.axisY; }); }),
                d3.max(dataColumns, function (c) { return d3.max(c.values, function (d) { return d.axisY; }); })
            ]);

            z.domain(dataColumns.map(function (c) { return c.id; }));

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
                .text("Temperature, ºF");

            const dataCol = g.selectAll(".dataCol")
                .data(dataColumns)
                .enter().append("g")
                .attr("class", "dataCol");

            dataCol.append("path")
                .attr("class", "line")
                .attr("d", function (d) { return line(d.values); })
                .style("stroke", function (d) { return z(d.id); });

            dataCol.append("text")
                .datum(function (d) { return { id: d.id, value: d.values[d.values.length - 1] }; })
                .attr("transform", function (d) { return "translate(" + x(d.value.axisX) + "," + y(d.value.axisY) + ")"; })
                .attr("x", 3)
                .attr("dy", "0.35em")
                .style("font", "10px sans-serif")
                .text(function (d) { return d.id; });
        });

        function type(d, _, columns) {
            d[columns[0]] = parseTime(d[columns[0]]);
            for (let i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
            return d;
        }

    }
    render() {
        return (
            <MultiLineChartComponent tsvPath={this.props.tsvPath} width={this.props.width} height={this.props.height} />
        );
    }
}