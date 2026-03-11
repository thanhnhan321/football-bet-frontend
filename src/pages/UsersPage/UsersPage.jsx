import DeleteUserPanel from "./components/DeleteUserPanel/DeleteUserPanel";
import EditUserPanel from "./components/EditUserPanel/EditUserPanel";
import UsersTableSection from "./components/UsersTableSection/UsersTableSection";
import AssignRolePanel from "./components/AssignRolePanel/AssignRolePanel";
import CreateUserPanel from "./components/CreateUserPanel/CreateUserPanel";
import MenuTabs from "./components/MenuTabs/MenuTabs";
import { useState } from "react";
import useUserAssignRole from "../../hooks/users/useUserAssignRole";
import useUserCreate from "../../hooks/users/useUserCreate";
import useUserDelete from "../../hooks/users/useUserDelete";
import useUserEdit from "../../hooks/users/useUserEdit";
import useUsersData from "../../hooks/users/useUsersData";
import useUsersSort from "../../hooks/users/useUsersSort";
import { USER_MENU_ITEMS } from "./constants";
import "./UsersPage.css";

function UsersPage() {
  const [activeMenu, setActiveMenu] = useState("create");
  const { users, roles, departments, loading, loadUsers } = useUsersData();
  const { sortConfig, sortedUsers, onSort, getSortIcon } = useUsersSort(users);
  const { createForm, creating, onCreateFormChange, onCreate } = useUserCreate({
    loadUsers,
  });
  const { assignForm, setAssignForm, assigningRole, userRoles, onAssignRole } =
    useUserAssignRole();
  const {
    editForm,
    updatingUser,
    onSelectUserForEdit,
    onEditFormChange,
    onUpdateUser,
  } = useUserEdit({ users, loadUsers });
  const { deleteUserId, setDeleteUserId, deletingUser, onDeleteUser } =
    useUserDelete({
      loadUsers,
      onAfterDelete: (deletedId) => {
        if (assignForm.user_id === deletedId) {
          setAssignForm((prev) => ({ ...prev, user_id: "" }));
        }
        if (editForm.id === deletedId) {
          onSelectUserForEdit("");
        }
      },
    });

  return (
    <div className="admin-user-page">
      <MenuTabs
        activeMenu={activeMenu}
        onChange={setActiveMenu}
        MENU_ITEMS={USER_MENU_ITEMS}
      />

      {activeMenu === "create" ? (
        <CreateUserPanel
          createForm={createForm}
          departments={departments}
          onCreateFormChange={onCreateFormChange}
          onCreate={onCreate}
          submitting={loading || creating}
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
