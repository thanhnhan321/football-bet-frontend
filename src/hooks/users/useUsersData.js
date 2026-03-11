import { useCallback, useEffect, useState } from "react";
import {
  fetchDepartmentsRequest,
  fetchRolesRequest,
  fetchUsersRequest,
} from "../../features/user/userApi";

export default function useUsersData() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUsersRequest();
      const list = Array.isArray(data) ? data : [];
      setUsers(list);
      return list;
    } catch {
      setUsers([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const loadRoles = useCallback(async () => {
    try {
      const data = await fetchRolesRequest();
      const list = Array.isArray(data) ? data : [];
      setRoles(list);
      return list;
    } catch {
      setRoles([]);
      return [];
    }
  }, []);

  const loadDepartments = useCallback(async () => {
    try {
      const data = await fetchDepartmentsRequest();
      const list = Array.isArray(data) ? data : [];
      setDepartments(list);
      return list;
    } catch {
      setDepartments([]);
      return [];
    }
  }, []);

  useEffect(() => {
    loadUsers();
    loadRoles();
    loadDepartments();
  }, [loadUsers, loadRoles, loadDepartments]);

  return {
    users,
    roles,
    departments,
    loading,
    loadUsers,
    loadRoles,
    loadDepartments,
  };
}
