export function dateFormatter(datepipe) {
  return (params) =>
    !params.data
      ? null
      :datepipe.transform(params.data.value, 'dd/MM/yyyy');

}
export function dateTimeFormatter(datepipe) {
  return (params) =>
    !params.data
      ? null
      : datepipe.transform(params.data.value, 'dd/MM/yyyy HH:mm');
}


export const dateColumnByFormatter = (formatter) => ({
  filter: 'agDateColumnFilter',
  suppressMenu: true,
  valueFormatter: formatter,
  filterParams: {
    comparator: function (filterLocalDateAtMidnight, cellValue: Date) {
      const day = cellValue.getDate();
      const month = cellValue.getMonth();
      const year = cellValue.getFullYear();
      const cellDate = new Date(year, month, day);
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      } else if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      } else {
        return 0;
      }
    },
  },
});
