import { SEASON_MENU_ITEMS } from "./constants";
import useAdminHomePageState from "../../hooks/useAdminHomePageState";
import MenuTabs from "../../components/blocks/MenuTabs";

function SeasonsPage() {
  const { activeMenu, setActiveMenu } = useAdminHomePageState();
  return (
    <div className="admin-user-page">
      <MenuTabs
        activeMenu={activeMenu}
        onChange={setActiveMenu}
        MENU_ITEMS={SEASON_MENU_ITEMS}
      />
    </div>
  );
}

export default SeasonsPage;
