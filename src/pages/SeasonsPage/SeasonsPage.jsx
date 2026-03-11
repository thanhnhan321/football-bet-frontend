import { SEASON_MENU_ITEMS } from "./constants";
import { useState } from "react";
import useSeasonCreate from "../../hooks/seasons/useSeasonCreate";
import useSeasonsData from "../../hooks/seasons/useSeasonsData";
import MenuTabs from "./components/MenuTabs/MenuTabs";
import SeasonsTableSection from "./components/SeasonsTableSection/SeasonsTableSection";
import CreateSeasonPanel from "./components/CreateSeasonPanel/CreateSeasonPanel";
import EditSeasonPanel from "./components/EditSeasonPanel/EditSeasonPanel";
import useSeasonEdit from "../../hooks/seasons/useSeasonEdit";
function SeasonsPage() {
  const [activeMenu, setActiveMenu] = useState("create");
  const { seasons, loading, loadSeasons } = useSeasonsData();
  const { createForm, creating, onCreateFormChange, onCreate } =
    useSeasonCreate({ loadSeasons });
  const {
    editForm,
    onSelectSeasonForEdit,
    onEditFormChange,
    onPressButton,
    onUpdating,
  } = useSeasonEdit({ seasons, loadSeasons });
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

      {activeMenu === "edit" ? (
        <EditSeasonPanel
          seasons={seasons}
          editForm={editForm}
          onSelectSeasonForEdit={onSelectSeasonForEdit}
          onEditFormChange={onEditFormChange}
          onPressButton={onPressButton}
          onUpdating={onUpdating}
        />
      ) : null}
      <SeasonsTableSection seasons={seasons} loading={loading} />
    </div>
  );
}

export default SeasonsPage;
