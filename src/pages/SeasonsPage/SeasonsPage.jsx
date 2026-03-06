import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Table from "../../components/ui/Table";
import {
  createSeasonRequest,
  fetchSeasonsRequest,
} from "../../features/season/seasonApi";
import { formatDate } from "../../utils/formatDate";
import "./SeasonsPage.css";
import MenuTabs from "../../components/blocks/MenuTabs";
import { SEASON_MENU_ITEMS } from "./constants";

function SeasonsPage() {
  const [activeMenu, setActiveMenu] = useState("create");
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    season_name: "",
    season_start: "",
    season_end: "",
  });

  const loadSeasons = async () => {
    setLoading(true);
    try {
      const data = await fetchSeasonsRequest();
      setSeasons(Array.isArray(data) ? data : []);
    } catch {
      setSeasons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSeasons();
  }, []);

  const onFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const getCreateSeasonInputError = () => {
    if (!form.season_name.trim()) return "Vui lòng nhập Tên mùa giải";
    if (!form.season_start) return "Vui lòng nhập Bắt đầu";
    if (!form.season_end) return "Vui lòng nhập Kết thúc";

    const start = new Date(form.season_start);
    const end = new Date(form.season_end);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return "Ngày bắt đầu hoặc kết thúc không hợp lệ";
    }
    if (end < start) return "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu";
    return null;
  };

  const onCreate = async () => {
    const inputError = getCreateSeasonInputError();
    if (inputError) {
      alert(inputError);
      return;
    }

    try {
      await createSeasonRequest({
        season_name: form.season_name.trim(),
        season_start: form.season_start,
        season_end: form.season_end,
      });

      setForm({
        season_name: "",
        season_start: "",
        season_end: "",
      });
      await loadSeasons();
      console.log("Tạo mùa giải thành công");
      alert("Tạo mùa giải thành công");
    } catch {
      alert("Tạo mùa giải thất bại");
    }
  };

  return (
    <div className="admin-season-page">
      <MenuTabs
        activeMenu={activeMenu}
        onChange={setActiveMenu}
        MENU_ITEMS={SEASON_MENU_ITEMS}
      />
      <div className="season-form-inline">
        <div className="season-field">
          <label className="season-label" htmlFor="seasonName">
            Tên mùa giải (season_name)
          </label>
          <Input
            id="seasonName"
            type="text"
            value={form.season_name}
            onChange={(e) => onFormChange("season_name", e.target.value)}
            placeholder="VD: World Cup 2026"
          />
        </div>

        <div className="season-field">
          <label className="season-label" htmlFor="seasonStart">
            Bắt đầu (season_start)
          </label>
          <Input
            id="seasonStart"
            type="datetime-local"
            value={form.season_start}
            onChange={(e) => onFormChange("season_start", e.target.value)}
          />
        </div>

        <div className="season-field">
          <label className="season-label" htmlFor="seasonEnd">
            Kết thúc (season_end)
          </label>
          <Input
            id="seasonEnd"
            type="datetime-local"
            value={form.season_end}
            onChange={(e) => onFormChange("season_end", e.target.value)}
          />
        </div>

        <div className="season-action">
          <Button onClick={onCreate} disabled={loading}>
            Tạo mùa giải
          </Button>
        </div>
      </div>

      <h3>Danh sách mùa giải đã tạo</h3>
      <Table>
        <thead>
          <tr>
            <th>Tên mùa giải</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((season, index) => (
            <tr key={`${season.season_name}-${season.season_start}-${index}`}>
              <td>{season.season_name}</td>
              <td>{formatDate(season.season_start)}</td>
              <td>{formatDate(season.season_end)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SeasonsPage;
