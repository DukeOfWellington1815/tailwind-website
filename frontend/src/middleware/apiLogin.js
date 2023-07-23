// middleware/apiLogin.js

const URL = "http://localhost:5000"; // backend URL

export async function login({ username, password }) {
  const response = await fetch(`${URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

  const data = await response.json();
  return data; // Assuming the response only contains user data, without the token property
}
