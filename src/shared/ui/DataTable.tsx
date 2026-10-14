import type { DataTableProps } from "../types/dataTable";

function DataTable<T>({
  data,
  columns,
  getRowKey,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100 bg-white">
      <table className="w-full border-collapse text-left">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-sm font-semibold text-gray-700"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={getRowKey(item)}
              className="border-t border-gray-100 hover:bg-gray-50"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4">
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;