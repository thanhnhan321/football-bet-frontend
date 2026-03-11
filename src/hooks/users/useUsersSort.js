import { useCallback, useMemo, useState } from "react";

export default function useUsersSort(users) {
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "asc",
  });

  const getSortValue = useCallback((user, key) => {
    if (key === "id") return Number(user.id) || 0;
    if (key === "initiated_date") {
      return new Date(user.initiated_date || 0).getTime() || 0;
    }
    if (key === "roles") {
      return Array.isArray(user.roles)
        ? user.roles.join(", ").toLowerCase()
        : "";
    }
    return String(user[key] ?? "").toLowerCase();
  }, []);

  const sortedUsers = useMemo(() => {
    const sorted = [...users];
    const factor = sortConfig.direction === "asc" ? 1 : -1;
    sorted.sort((a, b) => {
      const valueA = getSortValue(a, sortConfig.key);
      const valueB = getSortValue(b, sortConfig.key);
      if (typeof valueA === "number" && typeof valueB === "number") {
        return (valueA - valueB) * factor;
      }
      return (
        String(valueA).localeCompare(String(valueB), "vi", {
          sensitivity: "base",
          numeric: true,
        }) * factor
      );
    });
    return sorted;
  }, [getSortValue, sortConfig, users]);

  const onSort = useCallback((key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  }, []);

  const getSortIcon = useCallback(
    (key) => {
      if (sortConfig.key !== key) return "⇅";
      return sortConfig.direction === "asc" ? "▲" : "▼";
    },
    [sortConfig.direction, sortConfig.key],
  );

  return {
    sortConfig,
    sortedUsers,
    onSort,
    getSortIcon,
  };
}
