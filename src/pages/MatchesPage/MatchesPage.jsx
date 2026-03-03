import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createMatch,
  deleteMatch,
  fetchMatches,
  updateScore,
} from "../../features/match/matchSlice";
import { selectMatches, selectMatchesLoading } from "../../features/match/matchSelectors";
import { fetchSeasonsRequest } from "../../features/season/seasonApi";
import { TEAM_OPTIONS } from "../../utils/teams";
import MatchForm from "./components/MatchForm";
import MatchTable from "./components/MatchTable";
import "./MatchesPage.css";

const isFinishedMatch = (match) =>
  match.status === "finished" ||
  match.status === 1 ||
  match.state === "finished";

function MatchesPage() {
  const dispatch = useDispatch();
  const matches = useSelector(selectMatches);
  const loading = useSelector(selectMatchesLoading);
  const [seasons, setSeasons] = useState([]);

  const [form, setForm] = useState({
    season_id: "",
    teamA_name: "",
    teamB_name: "",
    match_start: "",
    match_bet: "",
    AgivesB: "",
  });
  const [scoreInputs, setScoreInputs] = useState({});

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  useEffect(() => {
    const loadSeasons = async () => {
      try {
        const data = await fetchSeasonsRequest();
        setSeasons(Array.isArray(data) ? data : []);
      } catch {
        setSeasons([]);
      }
    };

    loadSeasons();
  }, []);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    if (
      !form.season_id ||
      !form.teamA_name ||
      !form.teamB_name ||
      !form.match_start ||
      form.match_bet === "" ||
      form.AgivesB === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (form.teamA_name === form.teamB_name) {
      alert("Đội A và đội B không được trùng nhau");
      return;
    }

    if (Number(form.match_bet) < 0) {
      alert("Mức cược phải lớn hơn hoặc bằng 0");
      return;
    }

    if (!Number.isInteger(Number(form.AgivesB))) {
      alert("A chấp B phải là số nguyên");
      return;
    }

    dispatch(
      createMatch({
        season_id: Number(form.season_id),
        teamA_name: form.teamA_name,
        teamB_name: form.teamB_name,
        match_start: form.match_start,
        match_bet: Number(form.match_bet),
        AgivesB: Number(form.AgivesB),
        team_home_id: form.teamA_name,
        team_away_id: form.teamB_name,
        match_time: form.match_start,
      }),
    );

    setForm({
      season_id: "",
      teamA_name: "",
      teamB_name: "",
      match_start: "",
      match_bet: "",
      AgivesB: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      dispatch(deleteMatch(id));
    }
  };

  const handleScoreChange = (id, field, value) => {
    setScoreInputs({
      ...scoreInputs,
      [id]: {
        ...scoreInputs[id],
        [field]: value,
      },
    });
  };

  const handleUpdateScore = (id) => {
    const score = scoreInputs[id];

    if (
      score?.home === "" ||
      score?.away === "" ||
      score?.home == null ||
      score?.away == null
    ) {
      alert("Nhập đầy đủ tỷ số!");
      return;
    }

    dispatch(
      updateScore({
        id,
        home_score: Number(score.home),
        away_score: Number(score.away),
      }),
    );
  };

  return (
    <div className="admin-match-page">
      <MatchForm
        form={form}
        seasons={seasons}
        teamOptions={TEAM_OPTIONS}
        onFormChange={handleFormChange}
        onCreate={handleCreate}
      />
      <MatchTable
        matches={matches}
        loading={loading}
        isFinishedMatch={isFinishedMatch}
        onScoreChange={handleScoreChange}
        onUpdateScore={handleUpdateScore}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default MatchesPage;
