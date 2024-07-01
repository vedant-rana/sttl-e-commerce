export const getTokenFromCookie = () => {
  const cookie = document.cookie;
  const token = cookie.split("=")[1];
  return token;
};
