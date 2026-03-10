import "./Table.css";

function Table({ className = "", children }) {
  const classes = ["app-table", className].filter(Boolean).join(" ");
  return <table className={classes}>{children}</table>;
}

export default Table;
