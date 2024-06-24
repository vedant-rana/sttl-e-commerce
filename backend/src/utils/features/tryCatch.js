/**
 * @purpose to handle overall try catch
 *
 * @param fn controller function
 */
export const TryCatch = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
