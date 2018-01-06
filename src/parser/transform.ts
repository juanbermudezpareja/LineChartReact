export const arrayTansform = (data) => {
    let result = [];
    data.forEach((d) => {
        data.columns.slice(1).forEach((i) => {
            result.push({
                ciudad: i,
                date: d[data.columns[0]],
                sale: d[i]
            });
        });
    });
    return result;
}