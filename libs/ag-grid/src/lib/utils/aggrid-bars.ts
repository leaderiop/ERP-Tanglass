export const SIDEBAR = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
    },
  ],
};

export const STATUSBAR = {
  statusPanels: [
    {
      statusPanel: 'agTotalAndFilteredRowCountComponent',
      align: 'left',
    },
    {
      statusPanel: 'agTotalRowCountComponent',
      align: 'center',
    },
    { statusPanel: 'agFilteredRowCountComponent' },
    { statusPanel: 'agSelectedRowCountComponent' },
    { statusPanel: 'agAggregationComponent' },
  ],
};
