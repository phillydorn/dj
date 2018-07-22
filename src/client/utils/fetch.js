const fetch = async (url, options = {}) => {
  const headers = options.headers || {};

  if (options.data || options.body) {
    headers['content-type'] = 'application/json';
  }
  options.headers = headers;
  options.credentials = 'same-origin';
  const makeRequest = async () => {
    const response = await window.fetch(url, options);
    return response;
  };
  const response = await makeRequest();
  const json = await response.json();
  return json;
};

export default fetch;