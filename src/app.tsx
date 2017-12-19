import * as React from 'react';
import { MultiLineChart } from './components/charts/multiline/component'
import { Header } from './components/header/page';
import { Props } from 'react';
import { Table } from './components/table/component';

export const App: React.StatelessComponent<{}> = (props: Props<string>) => {
  return (
    <div>
      <Header title="Multiline Chart" />
      <MultiLineChart />
      <Table />
    </div>
  );
}
