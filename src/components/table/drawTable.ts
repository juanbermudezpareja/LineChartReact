import * as d3 from 'd3';

interface RowTable {
    column: string;
    value: string;
}


export const tabulate = (data, columns) => {
    const table = d3.select('#tableComponent').append('table').attr("class", "table text-center");
    const thead = table.append('thead');
    const tbody = table.append('tbody');

    thead.append('tr').attr("class", "text-center")
        .selectAll('th')
        .data(columns)
        .enter()
        .append('th')
        .text(function (d) { return d.toString() })

    const rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')

    const cells = rows.selectAll('td')
        .data(function (row) {
            return columns.map(function (column): RowTable {
                return { column: column, value: row[column] }
            })
        })
        .enter()
        .append('td')
        .text(function (d: RowTable) { return d.value })

    return table;
}
