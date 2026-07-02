const API_URL = import.meta.env.VITE_API_URL;

console.log("API:", API_URL);

// =========================
// SAFE RESPONSE HANDLER
// =========================
async function handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Something went wrong");
    }

    return data;
}

// =========================
// GET ALL DEPARTMENTS
// =========================
export async function getDepartments() {
  const res = await fetch(`${API_URL}/api/Department`);
  return handleResponse(res);
}

// =========================
// GET DEPARTMENT BY ID
// =========================
export async function getDepartmentById(id) {
  const res = await fetch(`${API_URL}/api/Department/${id}`);
  return handleResponse(res);
}

// =========================
// CREATE DEPARTMENT
// =========================
export async function createDepartment(department) {
  const res = await fetch(`${API_URL}/api/Department`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(department),
  });

  return handleResponse(res);
}

// =========================
// UPDATE DEPARTMENT
// =========================
export async function updateDepartment(id, department) {
  const res = await fetch(`${API_URL}/api/Department/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(department),
  });

  return handleResponse(res);
}

// =========================
// DELETE DEPARTMENT
// =========================
export async function deleteDepartment(id) {
  const res = await fetch(`${API_URL}/api/Department/${id}`, {
    method: "DELETE",
  });

  return handleResponse(res);
}

// =========================
// SEARCH DEPARTMENT
// =========================
export async function searchDepartment(keyword) {
  if (!keyword || keyword.trim() === "") {
    return getDepartments();
  }

  const res = await fetch(
    `${API_URL}/api/Department/search/${encodeURIComponent(keyword.trim())}`
  );

  return handleResponse(res);
}