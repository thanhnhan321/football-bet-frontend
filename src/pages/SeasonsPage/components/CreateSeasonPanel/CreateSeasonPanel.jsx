import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import "./CreateSeasonPanel.css";

function CreateSeasonPanel({
  createForm,
  onCreateFormChange,
  onCreate,
  submitting,
}) {
  return (
    <div className="season-function-panel">
      <h3>Tạo mùa giải</h3>
      <div className="season-form-inline">
        <div className="season-field">
          <label htmlFor="create-season_name" className="season-label">
            Tên mùa giải (season_name)
          </label>
          <Input
            id="create-season_name"
            type="text"
            value={createForm.season_name}
            onChange={(e) => onCreateFormChange("season_name", e.target.value)}
            placeholder="VD: World cup 2026"
          />
        </div>

        <div className="season-field">
          <label htmlFor="create-season_start" className="season-label">
            Ngày bắt đầu (season_start)
          </label>
          <Input
            id="create-season_start"
            type="datetime-local"
            value={createForm.season_start}
            onChange={(e) => onCreateFormChange("season_start", e.target.value)}
          />
        </div>

        <div className="season-field">
          <label htmlFor="create-season_end" className="season-label">
            Ngày kết thúc (season_end)
          </label>
          <Input
            id="create-season_end"
            type="datetime-local"
            value={createForm.season_end}
            onChange={(e) => onCreateFormChange("season_end", e.target.value)}
          />
        </div>

        <div className="season-action">
          <Button onClick={onCreate} disabled={submitting}>
            Tạo mùa giải
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateSeasonPanel;
