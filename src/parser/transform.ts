import * as d3 from 'd3';

export const arrayTansform = (data,formatDate) => {
    const parseTime = d3.timeParse(formatDate);
    let result = [];
    console.log(data)
    data.forEach((d) => {
        console.log(d)
        data.columns.slice(1).forEach((i) => {
            console.log(i)
            result.push({
                columnKey: i,
                date: parseTime(d[data.columns[0]]),
                value: d[i]
            });
        });
    });
    return result;
}