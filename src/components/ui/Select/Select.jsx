import "./Select.css";

function Select({ className = "", children, ...props }) {
  const classes = ["ui-select", className].filter(Boolean).join(" ");
  return (
    <select className={classes} {...props}>
      {children}
    </select>
  );
}

export default Select;
