import AssignRolePanel from "./components/AssignRolePanel";
import CreateUserPanel from "./components/CreateUserPanel";
import DeleteUserPanel from "./components/DeleteUserPanel";
import EditUserPanel from "./components/EditUserPanel";
import UsersTableSection from "./components/UsersTableSection";
import MenuTabs from "../../components/blocks/MenuTabs";
import useUsersPageState from "../../hooks/useUsersPageState";
import { USER_MENU_ITEMS } from "./constants";
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
          loading={loading}
          creating={creating}
          onCreateFormChange={onCreateFormChange}
          onCreate={onCreate}
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
