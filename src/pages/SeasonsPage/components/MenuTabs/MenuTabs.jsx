import "./MenuTabs.css";

function MenuTabs({ activeMenu, onChange, MENU_ITEMS }) {
  return (
    <div className="menu-tabs">
      {MENU_ITEMS.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`menu-tabs-item ${activeMenu === item.key ? "active" : ""}`}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default MenuTabs;
