const API_URL = process.env.API_URL;

async function getUsers(config) {
  const data = await fetch(`${API_URL}/users`, { ...config });
  return data.json();
}

export { getUsers };
