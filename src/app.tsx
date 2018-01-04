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
      <MultiLineChart tsvPath="assets/data.2.tsv" yAxisLabel="Price, €" width="600" height="400" />
      <Table tsvPath="assets/data.2.tsv" />
    </div>
  );
}