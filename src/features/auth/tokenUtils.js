const decodeJwtPayload = (token) => {
  if (!token) {
    return null;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];

    // Base64URL to Base64
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    // decode
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
