'use client'
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import { IoEllipsisVertical } from "react-icons/io5";

const statusColorMap = {
    ativo: "success",
    inativo: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "value", "status"];

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "USER", uid: "name", sortable: true},
  {name: "VALOR", uid: "value", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
];

const statusOptions = [
  {name: "Ativo", uid: "ativo"},
  {name: "Inativo", uid: "inativo"},
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    email: "t@gmail.com",
    value: "R$ 0.00",
    status: 'ativo'
  },
  {
    id: 2,
    name: "Zoey Lang",
    value: "R$ 0.00",
    email: "t@gmail.com",
    status: 'ativo'
  },
  {
    id: 3,
    name: "Jane Fisher",
    value: "R$ 0.00",
    email: "t@gmail.com",
    status: 'inativo'
  },
  {
    id: 4,
    name: "William Howard",
    value: "R$ 0.00",
    email: "t@gmail.com",
    status: 'inativo'
  },
  {
    id: 5,
    name: "Kristen Copper",
    value: "R$ 0.00",
    email: "t@gmail.com",
    status: 'inativo'
  },
  {
    id: 6,
    name: "Brian Kim",
    value: "R$ 0.00",
    email: "t@gmail.com",
    status: 'inativo'
  },
  {
    id: 7,
    name: "Michael Hunt",
    value: "R$ 0.00",
    email: "t@gmail.com",
    status: 'inativo'
  },
  {
    id: 8,
    name: "Samantha Brooks",
    value: "R$ 0.00",
    email: "t@gmail.com",
    status: 'inativo'
  },
  {
    id: 9,
    name: "Frank Harrison",
    value: "R$ 0.00",
    email: "t@gmail.com",
    status: 'inativo'
  },
  {
    id: 10,
    name: "Emma Adams",
    value: "R$ 0.00",
    email: "t@gmail.com",
    status: 'inativo'
  },
];

export default function TableInvite() {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
      column: "age",
      direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
  
    const pages = Math.ceil(users.length / rowsPerPage);
  
    const hasSearchFilter = Boolean(filterValue);
  
    const headerColumns = React.useMemo(() => {
      if (visibleColumns === "all") return columns;
  
      return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    const filteredItems = React.useMemo(() => {
      let filteredUsers = [...users];
  
      if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter((user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredUsers = filteredUsers.filter((user) =>
          Array.from(statusFilter).includes(user.status),
        );
      }
  
      return filteredUsers;
    }, [users, filterValue, statusFilter]);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);
  
    const sortedItems = React.useMemo(() => {
      return [...items].sort((a, b) => {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [sortDescriptor, items]);
  
    const renderCell = React.useCallback((user, columnKey) => {
      const cellValue = user[columnKey];
  
      switch (columnKey) {
        case "name":
          return (
            <span>{user.email}</span>
          );
        case "value":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[user.status]}
              size="sm"
              variant="dot"
            >
              {cellValue}
            </Chip>
          );
        default:
          return cellValue;
      }
    }, []);
  
    const onRowsPerPageChange = React.useCallback((e) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    }, []);
  
  
    const onSearchChange = React.useCallback((value) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    }, []);
  
    const topContent = React.useMemo(() => {
      return (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <Input
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="Encontrar usuario..."
              size="sm"
              value={filterValue}
              variant="bordered"
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    size="sm"
                    variant="flat"
                  >
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    size="sm"
                    variant="flat"
                  >
                    Columns
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode="multiple"
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.uid} className="capitalize">
                      {capitalize(column.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">Total {users.length} usuarios</span>
            <label className="flex items-center text-default-400 text-small">
              Por pagina:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
      );
    }, [
      filterValue,
      statusFilter,
      visibleColumns,
      onSearchChange,
      onRowsPerPageChange,
      users.length,
      hasSearchFilter,
    ]);
  
    const bottomContent = React.useMemo(() => {
      return (
        <div className="flex justify-between items-center">
          <Pagination
            showControls
            size="sm"
            classNames={{
              cursor: "bg-foreground text-background",
            }}
            color="default"
            isDisabled={hasSearchFilter}
            page={page}
            total={pages}
            variant="light"
            onChange={setPage}
          />
          <span className="text-small text-default-400">
            {selectedKeys === "all"
              ? "Todos selecionados"
              : `${selectedKeys.size} of ${items.length} selecionado`}
          </span>
        </div>
      );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);
  
    const classNames = React.useMemo(
      () => ({
        wrapper: ["max-h-[382px]", "max-w-3xl"],
        th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
        td: [
          "group-data-[first=true]:first:before:rounded-none",
          "group-data-[first=true]:last:before:rounded-none",
          "group-data-[middle=true]:before:rounded-none",
          "group-data-[last=true]:first:before:rounded-none",
          "group-data-[last=true]:last:before:rounded-none",
        ],
      }),
      [],
    );
  
    return (
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
}