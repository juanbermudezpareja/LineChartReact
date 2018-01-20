import * as React from 'react';
import { MultiLineChart } from './components/charts/multilinechart/component'
import { Header } from './components/header/page';
import { Props } from 'react';
import { Table } from './components/table/component';
import * as d3 from 'd3';

export const App: React.StatelessComponent = () => { 
  return (
    <div>
      <Header title="Multiline Chart" />
      <MultiLineChart  height="500" legendAxisY="Precio, €"/>
      <Table tsvPath="assets/data.3.tsv" />
    </div>
  );
}