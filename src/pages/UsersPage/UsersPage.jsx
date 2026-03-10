import DeleteUserPanel from "./components/DeleteUserPanel/DeleteUserPanel";
import EditUserPanel from "./components/EditUserPanel/EditUserPanel";
import UsersTableSection from "./components/UsersTableSection/UsersTableSection";
import AssignRolePanel from "./components/AssignRolePanel/AssignRolePanel";
import CreateUserPanel from "./components/CreateUserPanel/CreateUserPanel";
import MenuTabs from "./components/MenuTabs/MenuTabs";
import useUsersPageState from "../../hooks/useUsersPageState";
import { USER_CREATE_FIELDS, USER_MENU_ITEMS } from "./constants";
import "./UsersPage.css";

function UsersPage() {
  const {
    activeMenu,
    setActiveMenu,
    users,
    roles,
    departments,
    userRoles,
    loading,
    creating,
    assigningRole,
    updatingUser,
    deletingUser,
    createForm,
    assignForm,
    setAssignForm,
    editForm,
    deleteUserId,
    setDeleteUserId,
    sortConfig,
    sortedUsers,
    onCreateFormChange,
    onCreate,
    onAssignRole,
    onSelectUserForEdit,
    onEditFormChange,
    onUpdateUser,
    onDeleteUser,
    onSort,
    getSortIcon,
  } = useUsersPageState();
  const createUserFields = USER_CREATE_FIELDS(departments);

  return (
    <div className="admin-user-page">
      <MenuTabs
        activeMenu={activeMenu}
        onChange={setActiveMenu}
        MENU_ITEMS={USER_MENU_ITEMS}
      />

      {activeMenu === "create" ? (
        <CreateUserPanel
          title="Tạo người dùng"
          note="Mật khẩu ban đầu được đặt bằng username. Người dùng phải đổi mật khẩu ở lần đăng nhập đầu tiên."
          fields={createUserFields}
          form={createForm}
          onFormChange={onCreateFormChange}
          onSubmit={onCreate}
          submitting={loading || creating}
          submitLabel="Tạo người dùng"
        />
      ) : null}

      {activeMenu === "assign" ? (
        <AssignRolePanel
          assignForm={assignForm}
          users={users}
          roles={roles}
          assigningRole={assigningRole}
          userRoles={userRoles}
          setAssignForm={setAssignForm}
          onAssignRole={onAssignRole}
        />
      ) : null}

      {activeMenu === "edit" ? (
        <EditUserPanel
          editForm={editForm}
          users={users}
          departments={departments}
          updatingUser={updatingUser}
          onSelectUserForEdit={onSelectUserForEdit}
          onEditFormChange={onEditFormChange}
          onUpdateUser={onUpdateUser}
        />
      ) : null}

      {activeMenu === "delete" ? (
        <DeleteUserPanel
          deleteUserId={deleteUserId}
          users={users}
          deletingUser={deletingUser}
          setDeleteUserId={setDeleteUserId}
          onDeleteUser={onDeleteUser}
        />
      ) : null}

      <UsersTableSection
        users={sortedUsers}
        sortConfig={sortConfig}
        onSort={onSort}
        getSortIcon={getSortIcon}
      />
    </div>
  );
}

export default UsersPage;
