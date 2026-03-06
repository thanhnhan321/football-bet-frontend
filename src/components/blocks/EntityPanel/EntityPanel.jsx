import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

function EntityPanel({
  title,
  note,
  fields,
  form,
  onFormChange,
  onSubmit,
  submitting,
  submitLabel,
}) {
  return (
    <div className="user-function-panel">
      <h3>{title}</h3>
      {note ? <p className="user-note">{note}</p> : null}

      <div className="user-form-inline">
        {fields.map((field) => (
          <div className="user-field" key={field.key}>
            <label className="user-label" htmlFor={field.id}>
              {field.label}
            </label>

            {field.type === "select" ? (
              <Select
                id={field.id}
                value={form[field.key]}
                onChange={(e) => onFormChange(field.key, e.target.value)}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            ) : (
              <Input
                id={field.id}
                type={field.type || "text"}
                value={form[field.key]}
                onChange={(e) => onFormChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                min={field.min}
              />
            )}
          </div>
        ))}

        <div className="user-action">
          <Button onClick={onSubmit} disabled={submitting}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EntityPanel;
