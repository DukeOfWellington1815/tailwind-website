const URL = 'http://localhost:8000'; // backend URL

export async function login({ username, password }) {
  const response = await fetch(`${URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid username or password');
  }

  const data = await response.json();
  return data; // Assuming the response contains both user data and the JWT token
}

export async function getAllAbstracts(token) {
  const response = await fetch(`${URL}/api/abstracts`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    return Promise.reject(response);
  }

  const data = await response.json();
  return data;
}