import EntityPanel from "../../components/blocks/EntityPanel";
import { SEASON_CREATE_FIELDS, SEASON_MENU_ITEMS } from "./constants";
import useSeasonsPageState from "../../hooks/useSeasonsPageState";
import MenuTabs from "../../components/blocks/MenuTabs";
import SeasonsTableSection from "./components/SeasonsTableSection";
import "../UsersPage/UsersPage.css";
import "./SeasonsPage.css";

function SeasonsPage() {
  const {
    activeMenu,
    setActiveMenu,
    loading,
    creating,
    seasons,
    createForm,
    onCreateFormChange,
    onCreate,
  } = useSeasonsPageState();

  return (
    <div className="admin-user-page">
      <MenuTabs
        activeMenu={activeMenu}
        onChange={setActiveMenu}
        MENU_ITEMS={SEASON_MENU_ITEMS}
      />

      {activeMenu === "create" ? (
        <EntityPanel
          title="Tạo mùa giải"
          fields={SEASON_CREATE_FIELDS}
          form={createForm}
          onFormChange={onCreateFormChange}
          onSubmit={onCreate}
          submitting={loading || creating}
          submitLabel="Tạo mùa giải"
        />
      ) : null}

      <SeasonsTableSection seasons={seasons} loading={loading} />
    </div>
  );
}

export default SeasonsPage;
