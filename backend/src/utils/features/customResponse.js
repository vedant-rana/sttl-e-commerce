export const sendResponse = (
  res,
  success,
  statusCode,
  message,
  data,
  token
) => {
  const response = {
    success,
  };
  if (message) response.message = message;
  if (data) response.data = data;
  if (token) response.token = token;
  return res.status(statusCode).json(response);
};
