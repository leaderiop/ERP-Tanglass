const checkboxSelectionColumn = (params) => {
  const displayedColumns = params.columnApi.getAllDisplayedColumns();
  return displayedColumns[0] === params.column;
};

// AgGrid Parameters
export const gridOptions = (columnId) => ({
  getRowNodeId: (data) => {
    // the code is unique, so perfect for the ID
    return data[columnId];
  },
  // immutableData: true,
  animateRows: true,
});
export const defaultColDef = {
  sortable: true,
  floatingFilter: true,
  filter: true,
  flex: 1,
  minWidth: 160,
  enableRowGroup: true,
  headerCheckboxSelection: checkboxSelectionColumn,
  headerCheckboxSelectionFilteredOnly: checkboxSelectionColumn,
  checkboxSelection: checkboxSelectionColumn,
};
