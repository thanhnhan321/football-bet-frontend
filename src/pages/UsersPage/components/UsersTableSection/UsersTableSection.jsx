import Table from "../../../../components/Table";
import { formatDate } from "../../../../utils/formatDate";
import { USER_TABLE_COLUMNS } from "../../constants";

function UsersTableSection({ users, sortConfig, onSort, getSortIcon }) {
  return (
    <>
      <h3>Danh sách người dùng</h3>
      <Table>
        <thead>
          <tr>
            {USER_TABLE_COLUMNS.map((column) => (
              <th key={column.key}>
                <button
                  type="button"
                  className={`user-sort-btn ${sortConfig.key === column.key ? "active" : ""}`}
                  onClick={() => onSort(column.key)}
                >
                  <span>{column.label}</span>
                  <span className="user-sort-icon">
                    {getSortIcon(column.key)}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.department || "-"}</td>
              <td>
                {Array.isArray(user.roles) && user.roles.length
                  ? user.roles.join(", ")
                  : "-"}
              </td>
              <td>{formatDate(user.initiated_date)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UsersTableSection;
