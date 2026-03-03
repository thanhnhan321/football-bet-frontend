import { USER_MENU_ITEMS } from "../constants";

function UserMenuTabs({ activeMenu, onChange }) {
  return (
    <div className="user-menu">
      {USER_MENU_ITEMS.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`user-menu-item ${activeMenu === item.key ? "active" : ""}`}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default UserMenuTabs;
