const decodeJwtPayload = (token) => {
  if (!token) {
    return null;
  }

  try {
    const payload = token.split(".")[1];
    if (!payload) {
      return null;
    }

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const normalized = atob(base64);
    return JSON.parse(normalized);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const payload = decodeJwtPayload(token);
  const exp = payload?.exp;

  if (!exp || typeof exp !== "number") {
    return true;
  }

  return Date.now() >= exp * 1000;
};
