import * as React from 'react';
import * as d3 from 'd3';
import { ScaleTime, ScaleLinear, ScaleOrdinal, Line, Selection, DSVRowString, Axis } from 'd3';
import { dataHardcoded } from '../../../hardcode/dataHardcoded';
import { drawChart } from './drawChart';
import { arrayTansform } from '../../../parser/transform';

interface Props {
    tsvPath?: string;
    csvPath?: string;
    dateFormat?: string;
    height?: string
    legendAxisY: string;
}

export class MultiLineChart extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.tsvPath !== void (0)) {
            d3.tsv(this.props.tsvPath, (error, data) => {
                const dataTransformed = arrayTansform(data, this.props.dateFormat);
                drawChart(dataTransformed, this.props.legendAxisY, this.props.height);
            });
        } else if (this.props.csvPath !== void (0)) {
            d3.csv(this.props.csvPath, (error, data) => {
                const dataTransformed = arrayTansform(data, this.props.dateFormat);
                drawChart(dataTransformed, this.props.legendAxisY, this.props.height);
            });
        } else {
            // Hardcoded data
            drawChart(dataHardcoded, this.props.legendAxisY, this.props.height);
        }
    }
    render() {
        return (
            <svg id="chart"></svg>
        );
    }
}