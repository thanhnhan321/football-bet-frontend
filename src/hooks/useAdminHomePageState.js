import { useState } from "react";

export default function useAdminHomePageState() {
  const [activeMenu, setActiveMenu] = useState("create");
  return {
    activeMenu,
    setActiveMenu,
  };
}
