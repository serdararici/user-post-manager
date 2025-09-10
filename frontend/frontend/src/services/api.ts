export const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
};

export const fetchPosts = async () => {
  const res = await fetch(`${API_URL}/posts`);
  return res.json();
};