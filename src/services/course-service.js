const APP_URL = `${import.meta.env.VITE_API_URL}/api/Course`;

// =========================
// RESPONSE HANDLER
// =========================
async function handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Something went wrong");
    }

    return data;
}

// =========================
// GET ALL COURSES
// =========================
export async function getCourses() {
    const response = await fetch(APP_URL);
    return handleResponse(response);
}

// =========================
// GET COURSE BY ID
// =========================
export async function getCourseById(id) {
    const response = await fetch(`${APP_URL}/${id}`);
    return handleResponse(response);
}

// =========================
// CREATE COURSE
// =========================
export async function createCourse(course) {
    const response = await fetch(APP_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
    });

    return handleResponse(response);
}

// =========================
// UPDATE COURSE
// =========================
export async function updateCourse(id, course) {
    const response = await fetch(`${APP_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
    });

    return handleResponse(response);
}

// =========================
// DELETE COURSE
// =========================
export async function deleteCourse(id) {
    const response = await fetch(`${APP_URL}/${id}`, {
        method: "DELETE",
    });

    return handleResponse(response);
}