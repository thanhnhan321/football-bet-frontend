import { SEASON_MENU_ITEMS } from "./constants";
import useSeasonsPageState from "../../hooks/useSeasonsPageState";
import MenuTabs from "./components/MenuTabs/MenuTabs";
import SeasonsTableSection from "./components/SeasonsTableSection/SeasonsTableSection";

function SeasonsPage() {
  const { activeMenu, setActiveMenu, loading, seasons } = useSeasonsPageState();

  return (
    <div className="admin-user-page">
      <MenuTabs
        activeMenu={activeMenu}
        onChange={setActiveMenu}
        MENU_ITEMS={SEASON_MENU_ITEMS}
      />

      <SeasonsTableSection seasons={seasons} loading={loading} />
    </div>
  );
}

export default SeasonsPage;
