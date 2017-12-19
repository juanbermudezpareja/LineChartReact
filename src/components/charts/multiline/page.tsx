import * as React from 'react';


interface Props {
    width: string;
    height: string;
}


export const MultiLineChartComponent = (props: Props) => (
    <div className="container">
        <div className="jumbotron">
            <svg width={props.width} height={props.height} ></svg>
        </div>
    </div>
);

