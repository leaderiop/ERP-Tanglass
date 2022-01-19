
export enum ColumnType{
  normal,
  template
}

export interface Column {
  title: string;
  key: string;
  type: ColumnType;
  withRow?: boolean;
}
