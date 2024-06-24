/**
 * @purpose to add cookie in the clients browser
 *
 * @param res response object
 * @param user user object to generate token using his _id
 */
export const setCookieWithToken = (res, user) => {
  const options = {
    expires: new Date(
      Date.now() + (process.env.COOKIE_EXPIRE || "7") * (24 * 60 * 60 * 1000)
    ),
    httpOnly: false,
    secure: true,
    sameSite: "none",
  };

  const token = user.getJWTToken();

  res.cookie("token", token, options);
};
