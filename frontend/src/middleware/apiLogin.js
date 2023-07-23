// apiLogin.js
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
    return Promise.reject(response);
  }

  const data = await response.json();  
  console.log(data);
  return data;


}
