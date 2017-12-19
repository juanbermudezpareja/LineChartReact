import * as React from 'react';

interface Props {
    title: string;
}

export const Header = (props: Props) => (
    <div className="well text-center">
        <h1>{props.title}</h1>
    </div>
);