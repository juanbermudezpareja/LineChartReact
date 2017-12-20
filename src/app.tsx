import * as React from 'react';
import { MultiLineChart } from './components/charts/multiline/component'
import { Header } from './components/header/page';
import { Props } from 'react';
import { Table } from './components/table/component';

export const App: React.StatelessComponent<{}> = (props: Props<string>) => {
  return (
    <div>
      <Header title="Multiline Chart" />
      <MultiLineChart tsvPath="assets/data.tsv" width="600" height="300" />
      <Table tsvPath="assets/data.tsv" />
    </div>
  );
}
