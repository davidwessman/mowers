const getRequestData = (method = 'get', body = {}) => {
  const tokenElem = document.querySelector('meta[name="csrf-token"]');
  const token = tokenElem && tokenElem.getAttribute('content');

  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-Token': token,
    },
    body,
    credentials: 'same-origin',
  };
};

export default getRequestData;
