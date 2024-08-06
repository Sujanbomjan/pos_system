import type { IFormData } from "./form";

interface ITableBuilderProps {
  handleRowClick?: (id: string) => void;
  startCountOfPage: number;
  endCountOfPage: number;
  totalData: number;
  tableTitle: string;
  tableData?: TableData[];
  columns: IColumns[];
  actionHandler?: TableActionHandler;
  filterFormData?: IFormData;
  isFilter?: boolean;
  uniqueKey: string;
  isLoading?: boolean;
  totalPageCount?: number;
  selectedRowId: string[];
  setSelectedRowId: Dispatch<SetStateAction<string[]>>;
  handleSelectedDelete?: () => void;
  handleSelectedExport?: () => void;
  handleClickOnColumns?: TableColumnsClickHandler;
  showDeleteButton?: boolean;
}

interface TableActionHandler {
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
  handleView?: (id: string) => void;
  handleReturn?: (id: string) => void;
}

interface IColumns {
  isSortable?: boolean;
  type?: "image" | "boolean" | "date" | "object" | "float" | "custom";
  name: string;
  uid: string;
  objectField?: string;
  mainHeading?: string;
  subHeading?: string;
  render?: (item: any) => JSX.Element;
}

type TableData = { [key: string]: any };

type TableColumnsClickHandler = { [key: string]: (id) => void };

export type {
  IColumns,
  ITableBuilderProps,
  TableActionHandler,
  TableColumnsClickHandler,
  TableData,
};
