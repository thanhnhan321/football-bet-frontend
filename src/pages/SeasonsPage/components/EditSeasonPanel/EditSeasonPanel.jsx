import Select from "../../../../components/Select";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import "./EditSeasonPanel.css";
export default function EditSeasonPanel({
  seasons,
  editForm,
  onSelectSeasonForEdit,
  onEditFormChange,
  onPressButton,
  onUpdating,
}) {
  return (
    <div className="season-function-panel">
      <h3>Sửa mùa giải</h3>
      <div className="user-form-inline">
        <div className="user-form-items">
          <label htmlFor="season_name" className="season-label">
            Chọn mùa giải
          </label>
          <Select
            id="season_name"
            value={editForm.id}
            onChange={(e) => onSelectSeasonForEdit(e.target.value)}
          >
            <option value="">Chọn mùa giải</option>
            {seasons.map((season) => (
              <option key={season.id} value={season.id}>
                {`${season.id} - ${season.season_name}`}
              </option>
            ))}
          </Select>
        </div>

        <div className="user-form-items">
          <label htmlFor="season_start" className="season_label">
            Ngày bắt đầu
          </label>
          <Input
            id="season_start"
            type="datetime-local"
            value={editForm.season_start}
            onChange={(e) => onEditFormChange("season_start", e.target.value)}
          ></Input>
        </div>

        <div className="user-form-items">
          <label htmlFor="season_end" className="season_label">
            Ngày kết thúc
          </label>
          <Input
            id="season_end"
            type="datetime-local"
            value={editForm.season_end}
            onChange={(e) => onEditFormChange("season_end", e.target.value)}
          ></Input>
        </div>

        <div className="season-action">
          <Button onClick={onPressButton} disabled={onUpdating}>
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
}
