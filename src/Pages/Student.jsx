import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/student-service";

import { getDepartments } from "../services/department-service";
import { getCourses } from "../services/course-service";

export default function Student() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    address: "",
    phone: "",
    parentPhone: "",
    departmentId: "",
    courseId: "",
  });

  // ================= NORMALIZE =================
  const normalize = (res) => {
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.data)) return res.data;
    return [];
  };

  // ================= LOAD =================
  useEffect(() => {
    loadStudents();
    loadDepartments();
    loadCourses();
  }, []);

  async function loadStudents() {
    setLoading(true);
    const res = await getAllStudents();
    setStudents(normalize(res));
    setLoading(false);
  }

  async function loadDepartments() {
    const res = await getDepartments();
    setDepartments(normalize(res));
  }

  async function loadCourses() {
    const res = await getCourses();
    setCourses(normalize(res));
  }

  // ================= SEARCH =================
  const filtered = students.filter((s) =>
    `${s.firstName || s.FirstName} ${s.lastName || s.LastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= OPEN CREATE =================
  const openCreate = () => {
    setForm({
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      address: "",
      phone: "",
      parentPhone: "",
      departmentId: "",
      courseId: "",
    });
    setIsEdit(false);
    setShowModal(true);
  };

  // ================= OPEN EDIT =================
  const openEdit = (s) => {
    setForm({
      firstName: s.firstName || s.FirstName,
      lastName: s.lastName || s.LastName,
      gender: s.gender || s.Gender,
      age: s.age || s.Age,
      address: s.address || s.Address,
      phone: s.phone || s.Phone,
      parentPhone: s.parentPhone || s.ParentPhone,
      departmentId: s.departmentId || s.DepartmentId,
      courseId: s.courseId || s.CourseId,
    });

    setEditId(s.id || s.Id);
    setIsEdit(true);
    setShowModal(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      setSaving(true);

      if (isEdit) {
        await updateStudent(editId, form);
        Swal.fire("Updated!", "Student updated successfully", "success");
      } else {
        await createStudent(form);
        Swal.fire("Created!", "Student added successfully", "success");
      }

      setShowModal(false);
      loadStudents();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const res = await Swal.fire({
      title: "Delete Student?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!res.isConfirmed) return;

    await deleteStudent(id);
    Swal.fire("Deleted!", "Student removed", "success");
    loadStudents();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <Users className="text-blue-600" />
          <h1 className="text-2xl font-bold">Students</h1>
        </div>

        <button
          onClick={openCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2"
        >
          <Plus size={18} /> Add Student
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4 w-80 relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" />
        <input
          className="w-full pl-10 border p-2 rounded"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[900px]">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Address</th>
              <th>phone</th>
              <th>parent-no</th>
              <th>Department</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-5">
                  Loading...
                </td>
              </tr>
            ) : filtered.length > 0 ? (
              filtered.map((s) => (
                <tr key={s.id || s.Id} className="border-b hover:bg-gray-50">

                  <td className="p-3">{s.id || s.Id}</td>

                  <td>
                    {s.firstName || s.FirstName} {s.lastName || s.LastName}
                  </td>

                  <td>{s.gender || s.Gender}</td>
                 

                  <td>{s.age || s.Age}</td>
                   <td>{s.Address || s.address}</td>

                  <td>{s.phone || s.Phone}</td>
                  <td>{s.ParentPhone || s.parentPhone}</td>


                  <td>
                    {departments.find(d => d.id === (s.departmentId || s.DepartmentId))?.name ||
                      departments.find(d => d.Id === (s.DepartmentId || s.departmentId))?.Name ||
                      "N/A"}
                  </td>

                  <td>
                    {courses.find(c => c.id === (s.courseId || s.CourseId))?.courseName ||
                      courses.find(c => c.Id === (s.CourseId || s.courseId))?.CourseName ||
                      "N/A"}
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => openEdit(s)}
                      className="text-blue-600 p-2 hover:bg-blue-100 rounded"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(s.id || s.Id)}
                      className="text-red-600 p-2 hover:bg-red-100 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-5">
                  No Students Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            <motion.div className="bg-white p-5 rounded w-[500px]">

              <h2 className="text-xl font-bold mb-3">
                {isEdit ? "Update Student" : "Create Student"}
              </h2>

              <div className="grid grid-cols-2 gap-2">

                <input className="border p-2 rounded" placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />

                <input className="border p-2 rounded" placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />

                <div className="col-span-2">
                  <label className="block mb-2 font-medium">Gender</label>

                  <div className="flex gap-6">

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={form.gender === "Male"}
                        onChange={(e) =>
                          setForm({ ...form, gender: e.target.value })
                        }
                      />
                      Male
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={form.gender === "Female"}
                        onChange={(e) =>
                          setForm({ ...form, gender: e.target.value })
                        }
                      />
                      Female
                    </label>

                  </div>
                </div>

                <input className="border p-2 rounded" placeholder="Age"
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />

                <input className="border p-2 rounded" placeholder="Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
                <input className="border p-2 rounded" placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                {/* ✅ PARENT PHONE */}
                <input className="border p-2 rounded" placeholder="Parent Phone"
                  value={form.parentPhone}
                  onChange={(e) =>
                    setForm({ ...form, parentPhone: e.target.value })
                  }
                />

                <select
                  className="border p-2 rounded col-span-2"
                  value={form.departmentId}
                  onChange={(e) =>
                    setForm({ ...form, departmentId: e.target.value })
                  }
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d.id || d.Id} value={d.id || d.Id}>
                      {d.name || d.Name}
                    </option>
                  ))}
                </select>

                <select
                  className="border p-2 rounded col-span-2"
                  value={form.courseId}
                  onChange={(e) =>
                    setForm({ ...form, courseId: e.target.value })
                  }
                >
                  <option value="">Select Course</option>
                  {courses.map((c) => (
                    <option key={c.CourseId || c.courseId} value={c.CourseId || c.courseId}>
                      {c.CourseName || c.courseName}
                    </option>
                  ))}
                </select>

              </div>

              <div className="flex justify-end gap-2 mt-3">
                <button onClick={() => setShowModal(false)}>
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}