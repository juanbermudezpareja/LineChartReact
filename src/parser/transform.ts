import * as d3 from 'd3';

export const arrayTansform = (data,formatDate) => {
    const parseTime = d3.timeParse(formatDate);
    let result = [];
    data.forEach((d) => {
        data.columns.slice(1).forEach((i) => {
            result.push({
                columnKey: i,
                date: parseTime(d[data.columns[0]]),
                value: d[i]
            });
        });
    });
    return result;
}