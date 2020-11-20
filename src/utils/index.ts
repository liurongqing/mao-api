export const formatJson = (code = 200, data = {}, msg = '') => {
  return {
    code,
    data,
    msg,
  };
}
