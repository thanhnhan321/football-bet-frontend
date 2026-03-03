import Select from "../../../components/Select";
import { findTeamByName } from "../../../utils/teams";

function TeamSelect({ id, label, value, onChange, options, placeholder }) {
  const selectedTeam = findTeamByName(value);

  return (
    <div className="team-picker team-picker--team">
      <label className="picker-label" htmlFor={id}>
        {label}
      </label>
      <div className="team-select-inline">
        <Select id={id} value={value} onChange={onChange}>
          <option value="">{placeholder}</option>
          {options.map((team) => (
            <option key={team.name} value={team.name}>
              {team.name}
            </option>
          ))}
        </Select>
        {selectedTeam ? (
          <img className="team-flag" src={selectedTeam.flagUrl} alt={`${value} flag`} />
        ) : (
          <span className="team-flag team-flag--placeholder" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

export default TeamSelect;
