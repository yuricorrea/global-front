"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const rows = [
];

const columns = [
  {
    key: "name",
    label: "VALOR",
  },
  {
    key: "role",
    label: "BANCO",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export default function Tablen() {
  const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
  return (
    <>
      <div className="flex flex-col gap-3">
        <Table
          aria-label="Lista de transações"
          selectionMode="multiple"
          selectionBehavior={selectionBehavior}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
