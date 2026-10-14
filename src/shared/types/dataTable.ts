import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  title: string;
  render: (item: T) => ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowKey: (item: T) => string | number;
}