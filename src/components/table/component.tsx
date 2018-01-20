import * as React from 'react';
import * as d3 from 'd3';
import { tabulate } from './drawTable';

interface Props {
    tsvPath?: string;
    csvPath?: string;
}

export class Table extends React.Component<Props, {}> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.tsvPath !== void (0)) {
            d3.tsv(this.props.tsvPath, function (data) {
                const columns = data.columns;
                tabulate(data, columns)
            });
        } else if (this.props.csvPath !== void (0)) {
            d3.csv(this.props.csvPath, function (data) {
                const columns = data.columns;
                tabulate(data, columns)
            });
        }
    }
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <div id="tableComponent" className="table-responsive"></div>
                </div>
            </div>
        );
    }
}