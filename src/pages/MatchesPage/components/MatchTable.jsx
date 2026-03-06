import Table from "../../../components/ui/Table";
import { formatDate } from "../../../utils/formatDate";

function MatchTable({
  matches,
  isFinishedMatch,
}) {
  return (
    <>
      <h3>Danh sách trận đã tạo</h3>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Đội A</th>
            <th>Đội B</th>
            <th>Mức cược</th>
            <th>A chấp B</th>
            <th>Bóng lăn</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.id}</td>
              <td>{match.teamA_name || match.team_home_name}</td>
              <td>{match.teamB_name || match.team_away_name}</td>
              <td>{match.match_bet}</td>
              <td>{match.AgivesB}</td>
              <td>{formatDate(match.match_start || match.match_time)}</td>
              <td>{isFinishedMatch(match) ? "Đã kết thúc" : "Chưa diễn ra"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default MatchTable;
