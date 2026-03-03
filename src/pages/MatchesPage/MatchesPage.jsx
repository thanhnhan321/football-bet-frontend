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

const getCurrentDateTimeLocal = () => {
  const now = new Date();
  const timezoneOffsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - timezoneOffsetMs).toISOString().slice(0, 16);
};

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
  const [agivesBError, setAgivesBError] = useState("");
  const [scoreInputs, setScoreInputs] = useState({});
  const teamAOptions = TEAM_OPTIONS.filter((team) => team.name !== form.teamB_name);
  const teamBOptions = TEAM_OPTIONS.filter((team) => team.name !== form.teamA_name);

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
    let normalizedValue = value;
    if (field === "AgivesB") {
      normalizedValue = value.replace(",", ".").trim();
    }
    if (field === "match_bet") {
      normalizedValue = value.replace(/\D/g, "");
    }

    setForm((prev) => ({ ...prev, [field]: normalizedValue }));

    if (field !== "AgivesB") {
      return;
    }

    if (normalizedValue === "") {
      setAgivesBError("");
      return;
    }

    const numeric = Number(normalizedValue);
    if (Number.isNaN(numeric)) {
      setAgivesBError("A chấp B phải là số");
      return;
    }

    if (!isHalfStep(normalizedValue)) {
      setAgivesBError("A chấp B phải là số nguyên hoặc dạng .5");
      return;
    }

    setAgivesBError("");
  };

  const isHalfStep = (value) => {
    const numeric = Number(value);
    return !Number.isNaN(numeric) && Math.abs(numeric * 2 - Math.round(numeric * 2)) < 1e-9;
  };

  const formatMoneyDisplay = (rawDigits) => {
    const digits = String(rawDigits ?? "").replace(/\D/g, "");
    if (!digits) {
      return "";
    }
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const parseMoneyValue = (value) => {
    const raw = String(value ?? "").trim();
    if (raw === "") {
      return { isEmpty: true, isValid: false, amount: null };
    }

    const compact = raw.replace(/\s+/g, "");
    const plainDigits = /^\d+$/.test(compact);
    const groupedThousands = /^\d{1,3}([.,]\d{3})+$/.test(compact);

    if (!plainDigits && !groupedThousands) {
      return { isEmpty: false, isValid: false, amount: null };
    }

    const digits = compact.replace(/[.,]/g, "");
    if (digits === "") {
      return { isEmpty: false, isValid: false, amount: null };
    }

    const amountBigInt = BigInt(digits);
    const maxDbInteger = 2147483647n; // PostgreSQL INTEGER max
    if (amountBigInt > maxDbInteger) {
      return { isEmpty: false, isValid: false, amount: null };
    }

    const amount = Number(amountBigInt);
    if (!Number.isInteger(amount)) {
      return { isEmpty: false, isValid: false, amount: null };
    }

    return { isEmpty: false, isValid: true, amount };
  };

  const getCreateMatchInputError = () => {
    if (!form.season_id) return "Vui lòng chọn mùa giải";
    if (!form.teamA_name) return "Vui lòng chọn Team A";
    if (!form.teamB_name) return "Vui lòng chọn Team B";
    if (form.teamA_name === form.teamB_name) return "Đội A và đội B không được trùng nhau";
    if (!form.match_start) return "Vui lòng nhập Ngày giờ bóng lăn";
    const matchStartDate = new Date(form.match_start);
    if (Number.isNaN(matchStartDate.getTime())) return "Ngày giờ bóng lăn không hợp lệ";
    if (matchStartDate.getTime() <= Date.now()) {
      return "Ngày giờ bóng lăn phải là thời gian ở tương lai";
    }

    const parsedMoney = parseMoneyValue(form.match_bet);
    if (parsedMoney.isEmpty) return "Vui lòng nhập Mức cược";
    if (!parsedMoney.isValid) {
      return "Mức cược không hợp lệ hoặc vượt quá giới hạn cho phép";
    }

    const agivesBText = String(form.AgivesB ?? "").trim();
    if (agivesBText === "") return "Vui lòng nhập A chấp B";
    if (Number.isNaN(Number(agivesBText))) return "A chấp B phải là số";
    if (!isHalfStep(agivesBText)) return "A chấp B phải là số nguyên hoặc dạng .5";

    return null;
  };

  const handleCreate = async () => {
    if (agivesBError) {
      alert(agivesBError);
      return;
    }

    const inputError = getCreateMatchInputError();
    if (inputError) {
      alert(inputError);
      return;
    }

    try {
      const parsedMoney = parseMoneyValue(form.match_bet);
      await dispatch(
        createMatch({
          season_id: Number(form.season_id),
          teamA_name: form.teamA_name,
          teamB_name: form.teamB_name,
          match_start: form.match_start,
          match_bet: parsedMoney.amount,
          AgivesB: Number(form.AgivesB),
          team_home_id: form.teamA_name,
          team_away_id: form.teamB_name,
          match_time: form.match_start,
        }),
      ).unwrap();

      console.log("Tạo trận thành công");
      alert("Tạo trận thành công");

      setForm({
        season_id: "",
        teamA_name: "",
        teamB_name: "",
        match_start: "",
        match_bet: "",
        AgivesB: "",
      });
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Tạo trận thất bại";
      alert(message);
    }
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
        matchBetDisplay={formatMoneyDisplay(form.match_bet)}
        agivesBError={agivesBError}
        seasons={seasons}
        teamAOptions={teamAOptions}
        teamBOptions={teamBOptions}
        matchStartMin={getCurrentDateTimeLocal()}
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
