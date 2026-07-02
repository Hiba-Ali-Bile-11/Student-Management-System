const API_URL = import.meta.env.VITE_API_URL;

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
// GET ALL STUDENTS
// =========================
export async function getAllStudents() {
  const res = await fetch(`${API_URL}/api/student`);
  return handleResponse(res);
}


// =========================
// GET STUDENT BY ID
// =========================
export async function getStudentById(id) {
  const res = await fetch(`${API_URL}/api/student/${id}`);
  return handleResponse(res);
}

// =========================
// CREATE STUDENT
// =========================
export async function createStudent(student) {
  const res = await fetch(`${API_URL}/api/student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  return handleResponse(res);
}

// =========================
// UPDATE STUDENT
// =========================
export async function updateStudent(id, student) {
  const res = await fetch(`${API_URL}/api/student/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  return handleResponse(res);
}

// =========================
// DELETE STUDENT
// =========================
export async function deleteStudent(id) {
  const res = await fetch(`${API_URL}/api/student/${id}`, {
    method: "DELETE",
  });

  return handleResponse(res);
}

// =========================
// SEARCH STUDENT (FIXED)
// =========================

export async function searchStudent(keyword) {
  if (!keyword || keyword.trim() === "") {
    return getAllStudents();
  }

  const res = await fetch(
    `${API_URL}/api/student/search/${encodeURIComponent(keyword.trim())}`
  );

  return handleResponse(res);
}