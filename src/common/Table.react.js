import './Table.react.css';

/**
 * Component interface:
 * 
 * type Column<T> = {
 *  key: string,
 *  title: string,
 *  width?: number,
 *  render?: (column: Column<T>, item: T) => React.Component,
 *  cellStyle?: React.CSSProperties | undefined,
 * };
 * 
 * type TableProps<T> = {
 *  data: Array<T>,
 *  columns: Array<Column<T>>,
 *  toggleRowHighlight?: (item: T) => boolean,
 *  highlightOnHover?: boolean,
 *  tableStyle?: React.CSSProperties | undefined,
 * };
 */

function Table({ data, columns, toggleRowHighlight, highlightOnHover, tableStyle }) {
  return (
    <div style={{...tableStyle}}>
      <table className="table">
        <thead>
          <TableHeader columns={columns} />
        </thead>
        <tbody>
          <TableRows
            data={data}
            columns={columns}
            highlightOnHover={highlightOnHover}
            toggleRowHighlight={toggleRowHighlight}
          />
        </tbody>
      </table>
    </div>
  );
}

function TableHeader({ columns }) {
  return (
    <tr>
      {columns.map(column => (
        <th
          key={column.key}
          className="table-header"
          style={{ width: column.width ?? 0 }}
          scope="col"
        >
          {column.title}
        </th>
      ))}
    </tr>
  );
}

function TableRows({ data, columns, highlightOnHover, toggleRowHighlight }) {
  return data.map(item => {
    const rowClassName = [
      'table-row',
      toggleRowHighlight && toggleRowHighlight(item) ? 'table-row-selected' : null,
    ].join(' ');
    return (
      <tr
        className={rowClassName}
        key={item.name}
        onMouseOver={(e) => highlightOnHover && e.target.closest('tr').classList.add('table-row-hover')}
        onMouseOut={(e) => highlightOnHover && e.target.closest('tr').classList.remove('table-row-hover')}
      >
        {columns.map(column => (
          <TableCell
            key={column.key}
            column={column}
            item={item}
          />
        ))}
      </tr>
    );
  });
}

function TableCell({ column, item }) {
  const cellContent = column.render
    ? column.render(column, item)
    : item[column.key];
  return (
    <td
      className="table-cell"
      key={item.name}
      style={column.cellStyle}
    >
      {cellContent}
    </td>
  );
}

export default Table;