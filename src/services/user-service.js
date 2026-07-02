const API_URL = import.meta.env.VITE_API_URL;

console.log("API:", API_URL);

// =========================
// SAFE RESPONSE HANDLER
// =========================
async function handleResponse(response) {
  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

// =========================
// GET ALL USERS
// =========================
export async function getAllUsers() {
  const res = await fetch(`${API_URL}/api/Users`);
  return handleResponse(res);
}

// =========================
// GET USER BY ID
// =========================
export async function getUserById(id) {
  const res = await fetch(`${API_URL}/api/Users/${id}`);
  return handleResponse(res);
}

// =========================
// CREATE USER
// =========================
export async function createUser(user) {
  const res = await fetch(`${API_URL}/api/Users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return handleResponse(res);
}

// =========================
// UPDATE USER
// =========================
export async function updateUser(id, user) {
  const res = await fetch(`${API_URL}/api/Users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return handleResponse(res);
}

// =========================
// DELETE USER
// =========================
export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/api/Users/${id}`, {
    method: "DELETE",
  });

  return handleResponse(res);
}

// =========================
// SEARCH USER
// =========================
export async function searchUser(keyword) {
  if (!keyword || keyword.trim() === "") {
    return getAllUsers();
  }

  const res = await fetch(
    `${API_URL}/api/Users/search/${encodeURIComponent(keyword.trim())}`
  );

  return handleResponse(res);
}

// =========================
// LOGIN
// =========================
export async function login(email, password) {
  const res = await fetch(`${API_URL}/api/Users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return handleResponse(res);
}

// =========================
// CHANGE PASSWORD
// =========================
export async function changePassword(email, oldPassword, newPassword) {
  const res = await fetch(`${API_URL}/api/Users/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      oldPassword,
      newPassword,
    }),
  });

  return handleResponse(res);
}

// =========================
// FORGET PASSWORD
// =========================
export async function forgetPassword(email, newPassword) {
  const res = await fetch(`${API_URL}/api/Users/forget-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      newPassword,
    }),
  });

  return handleResponse(res);
}