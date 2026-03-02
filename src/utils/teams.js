export const TEAM_OPTIONS = [
  {
    name: "Vietnam",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/320px-Flag_of_Vietnam.svg.png",
  },
  {
    name: "England",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/320px-Flag_of_England.svg.png",
  },
  {
    name: "France",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/320px-Flag_of_France.svg.png",
  },
  {
    name: "Germany",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/320px-Flag_of_Germany.svg.png",
  },
  {
    name: "Spain",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/320px-Flag_of_Spain.svg.png",
  },
  {
    name: "Portugal",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/320px-Flag_of_Portugal.svg.png",
  },
  {
    name: "Brazil",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/320px-Flag_of_Brazil.svg.png",
  },
  {
    name: "Argentina",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/320px-Flag_of_Argentina.svg.png",
  },
];

export const findTeamByName = (name) =>
  TEAM_OPTIONS.find((team) => team.name === name) || null;
