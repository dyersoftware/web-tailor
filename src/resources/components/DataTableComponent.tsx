/* eslint-disable react-hooks/exhaustive-deps */
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
  FaSort,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa6";

type DataTableComponentProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  loading?: boolean;
  error?: string | null;
};

function DataTableComponent<T>({
  data,
  columns,
  loading = false,
  error = null,
}: DataTableComponentProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  // ✅ Debounced search (no memory leak)
  const debouncedSetFilter = useMemo(
    () =>
      debounce((value: string) => {
        setGlobalFilter(value);
      }, 400),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSetFilter.cancel();
    };
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    // ✅ Safe global filter
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return String(value ?? "")
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    },
  });

  // ================= STATES =================

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 px-4">
        <div className="alert alert-error shadow-lg">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="mt-4  space-y-4 card bg-base-100 shadow-sm p-4 md:p-0">
      {/* 🔍 SEARCH + PAGE SIZE */}
      <div className="px-4 pt-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full sm:max-w-xs"
          onChange={(e) => debouncedSetFilter(e.target.value)}
        />

        <select
          className="select select-bordered w-full sm:w-auto"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-lg border border-base-100">
          <table className="table">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {(() => {
                          const sort = header.column.getIsSorted();

                          if (sort === "asc") {
                            return <FaSortUp className="text-xs" />;
                          }

                          if (sort === "desc") {
                            return <FaSortDown className="text-xs" />;
                          }

                          return <FaSort className="text-xs opacity-50" />;
                        })()}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden space-y-4">
        {table.getRowModel().rows.map((row, index) => (
          <div
            key={row.id}
            className="card bg-base-100 shadow border border-base-100"
          >
            <div className="card-body p-4 space-y-2">
              <h2 className="font-bold text-sm">#{index + 1}</h2>

              {row.getVisibleCells().map((cell) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const colDef: any = cell.column.columnDef;

                // Skip empty headers
                if (!colDef.header) return null;

                // Skip actions for now
                if (colDef.header === "Actions") return null;

                return (
                  <div key={cell.id} className="text-sm">
                    <span className="font-medium">
                      {colDef.meta?.label || colDef.header}:
                    </span>{" "}
                    {flexRender(
                      colDef.cell ?? cell.getValue(),
                      cell.getContext(),
                    )}
                  </div>
                );
              })}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                {row
                  .getVisibleCells()
                  .filter((cell) => cell.column.columnDef.header === "Actions")
                  .map((cell) => (
                    <div key={cell.id} className="w-full">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 px-4 pb-4">
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <div className="flex gap-2">
          <button
            className="btn btn-sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <FaAnglesLeft />
          </button>

          <button
            className="btn btn-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <FaAngleLeft />
          </button>

          <button
            className="btn btn-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <FaAngleRight />
          </button>

          <button
            className="btn btn-sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <FaAnglesRight />
          </button>
        </div>
      </div>

      {/* ================= EMPTY ================= */}
      {data.length === 0 && (
        <div className="text-center text-gray-500 mt-4">No data found</div>
      )}
    </div>
  );
}

export default DataTableComponent;
