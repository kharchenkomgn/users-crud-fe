import React from "react";

import { User, TableColumn } from "../../models/models";
import columnsConfig from "./UsersTable.config";
import "./UsersTable.scss";

interface UsersTableProps {
  openEditUserModal: (user: User) => void;
  users: User[];
}

function UsersTable({ users, openEditUserModal }: UsersTableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columnsConfig.map((column: TableColumn, idx: number) => (
            <th key={idx}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(users || []).map((user: any) => (
          <tr key={user._id} onDoubleClick={() => openEditUserModal(user)}>
            {columnsConfig.map((column: TableColumn, idx: number) => (
              <td key={idx}>{user[column.fieldName]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default React.memo(UsersTable);
