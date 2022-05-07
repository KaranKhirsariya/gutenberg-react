const API_BASE_URL = 'http://skunkworks.ignitesol.com:8000/books/';
const mime_type = ['image'].join(',');

const fetchBooks = async ({ topic = '', search = '', page = '1' }) => {
  const headers = new Headers();
  headers.append('accept', 'application/json');
  let params = new URLSearchParams({ topic, search, mime_type, page });
  const init = {
    method: 'GET',
    headers,
  };

  const response = await fetch(`${API_BASE_URL}?${params.toString()}`, init);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export { fetchBooks };
