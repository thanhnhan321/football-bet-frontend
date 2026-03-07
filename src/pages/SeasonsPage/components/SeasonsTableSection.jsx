import Table from "../../../components/ui/Table/Table";

function SeasonsTableSection({ seasons, loading }) {
  return (
    <>
      <h3>Danh sách mùa giải</h3>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên mùa giải</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
            </tr>
          </thead>
          <tbody>
            {seasons.map((season) => (
              <tr key={season.id}>
                <td>{season.id}</td>
                <td>{season.season_name}</td>
                <td>{new Date(season.season_start).toLocaleDateString()}</td>
                <td>{new Date(season.season_end).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default SeasonsTableSection;
