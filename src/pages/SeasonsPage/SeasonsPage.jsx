import { SEASON_MENU_ITEMS } from "./constants";
import useSeasonsPageState from "../../hooks/useSeasonsPageState";
import MenuTabs from "./components/MenuTabs/MenuTabs";
import SeasonsTableSection from "./components/SeasonsTableSection/SeasonsTableSection";
import CreateSeasonPanel from "./components/CreateSeasonPanel/CreateSeasonPanel";

function SeasonsPage() {
  const {
    activeMenu,
    setActiveMenu,
    loading,
    seasons,
    createForm,
    onCreateFormChange,
    onCreate,
    creating,
  } = useSeasonsPageState();

  return (
    <div className="admin-user-page">
      <MenuTabs
        activeMenu={activeMenu}
        onChange={setActiveMenu}
        MENU_ITEMS={SEASON_MENU_ITEMS}
      />

      {activeMenu === "create" ? (
        <CreateSeasonPanel
          createForm={createForm}
          onCreateFormChange={onCreateFormChange}
          onCreate={onCreate}
          submitting={loading || creating}
        />
      ) : null}
      <SeasonsTableSection seasons={seasons} loading={loading} />
    </div>
  );
}

export default SeasonsPage;
