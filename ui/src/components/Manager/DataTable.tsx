import tableStyles from "../DeparturesTable.module.css";

interface DataTableProps {
  colCount: number;
  tableTitle: string;
  tableHeaders: JSX.Element[];
  tableBody: JSX.Element[];
  disableHeaderBorder?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const DataTable = ({
  colCount,
  tableTitle,
  tableHeaders,
  tableBody,
  disableHeaderBorder,
  className,
  style,
}: DataTableProps) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        className={`${tableStyles.table} ${className ? className : ""}`}
        style={style}
      >
        <thead>
          <tr>
            <th colSpan={colCount} className={tableStyles["table-caption"]}>
              {tableTitle}
            </th>
          </tr>
        </thead>
        <thead>
          <tr className={disableHeaderBorder ? tableStyles["no-border"] : ""}>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
};

export default DataTable;
