import * as React from 'react';
import * as d3 from 'd3';
import { ScaleTime, ScaleLinear, ScaleOrdinal, Line, Selection, DSVRowString, Axis } from 'd3';
import { dataHardcoded } from '../../../../assets/dataHardcoded';
import { drawChart } from './drawChart';
import { arrayTansform } from '../../../parser/transform';

interface Props {
    tsvPath?: string;
    width: string;
    height: string;
}

export class MultiLineChart extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.tsvPath !== void (0)) {
            d3.tsv(this.props.tsvPath, (error, data) => {
                const dataTransformed = arrayTansform(data);
                drawChart(dataTransformed, this.props.width, this.props.height);
            });
        } else {
            drawChart(dataHardcoded, this.props.width, this.props.height);
        }
    }
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <svg width={this.props.width} height={this.props.height} ></svg>
                </div>
            </div>
        );
    }
}