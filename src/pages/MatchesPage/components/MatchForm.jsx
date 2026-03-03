import Button from "../../../components/Button";
import Input from "../../../components/Input";
import TeamSelect from "./TeamSelect";

function MatchForm({ form, teamOptions, onFormChange, onCreate }) {
  return (
    <div className="section">
      <h3>Tạo trận mới</h3>
      <div className="team-picker-row">
        <TeamSelect
          id="teamA"
          label="Team A"
          value={form.teamA_name}
          onChange={(e) => onFormChange("teamA_name", e.target.value)}
          options={teamOptions}
          placeholder="Chọn đội A"
        />
        <TeamSelect
          id="teamB"
          label="Team B"
          value={form.teamB_name}
          onChange={(e) => onFormChange("teamB_name", e.target.value)}
          options={teamOptions}
          placeholder="Chọn đội B"
        />
      </div>

      <div className="team-picker">
        <label className="picker-label" htmlFor="matchStart">
          Ngày giờ bóng lăn (match_start)
        </label>
        <Input
          id="matchStart"
          type="datetime-local"
          value={form.match_start}
          onChange={(e) => onFormChange("match_start", e.target.value)}
        />
      </div>

      <div className="team-picker">
        <label className="picker-label" htmlFor="matchBet">
          Mức cược (match_bet)
        </label>
        <Input
          id="matchBet"
          type="number"
          min={0}
          value={form.match_bet}
          onChange={(e) => onFormChange("match_bet", e.target.value)}
        />
      </div>

      <div className="team-picker">
        <label className="picker-label" htmlFor="matchDescription">
          Mô tả trận (match_description)
        </label>
        <Input
          id="matchDescription"
          type="text"
          value={form.match_description}
          onChange={(e) => onFormChange("match_description", e.target.value)}
          placeholder="Nhập mô tả trận"
        />
      </div>

      <Button onClick={onCreate}>Tạo trận</Button>
    </div>
  );
}

export default MatchForm;
