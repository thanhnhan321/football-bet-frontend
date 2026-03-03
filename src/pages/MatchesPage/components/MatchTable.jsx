import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Table from "../../../components/Table";
import { formatDate } from "../../../utils/formatDate";

function MatchTable({
  matches,
  isFinishedMatch,
  onScoreChange,
  onUpdateScore,
  onDelete,
}) {
  return (
    <>
      <h3>Danh sách trận đã tạo</h3>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Đội nhà</th>
            <th>Đội khách</th>
            <th>Thời gian</th>
            <th>Trạng thái</th>
            <th>Tỷ số</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.id}</td>
              <td>{match.teamA_name || match.team_home_name}</td>
              <td>{match.teamB_name || match.team_away_name}</td>
              <td>{formatDate(match.match_start || match.match_time)}</td>
              <td>{isFinishedMatch(match) ? "Đã kết thúc" : "Chưa diễn ra"}</td>
              <td>
                {isFinishedMatch(match)
                  ? `${match.home_score} - ${match.away_score}`
                  : "-"}
              </td>
              <td>
                {!isFinishedMatch(match) && (
                  <>
                    <Input
                      type="number"
                      className="score-input"
                      placeholder="Home"
                      onChange={(e) => onScoreChange(match.id, "home", e.target.value)}
                    />
                    <Input
                      type="number"
                      className="score-input"
                      placeholder="Away"
                      onChange={(e) => onScoreChange(match.id, "away", e.target.value)}
                    />
                    <Button size="sm" onClick={() => onUpdateScore(match.id)}>
                      Lưu
                    </Button>
                  </>
                )}

                <div className="match-delete-wrap">
                  <Button variant="danger" size="sm" onClick={() => onDelete(match.id)}>
                    Xóa
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default MatchTable;
