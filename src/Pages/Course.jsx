import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../services/course-service";

import { getDepartments } from "../services/department-service";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [creditHours, setCreditHours] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const [errors, setErrors] = useState({});

  // ================= VALIDATION =================
  const isOnlyLetters = (text) => /^[a-zA-Z\s]+$/.test(text);
  const isOnlyNumbers = (text) => /^[0-9]+$/.test(text);

  const handleCourseName = (value) => {
    setCourseName(value);

    if (!isOnlyLetters(value)) {
      setErrors((prev) => ({
        ...prev,
        courseName: "Course name must contain only letters",
      }));
    } else {
      setErrors((prev) => {
        const e = { ...prev };
        delete e.courseName;
        return e;
      });
    }
  };

  const handleCreditHours = (value) => {
    setCreditHours(value);

    if (!isOnlyNumbers(value)) {
      setErrors((prev) => ({
        ...prev,
        creditHours: "Credit hours must be numbers only",
      }));
    } else {
      setErrors((prev) => {
        const e = { ...prev };
        delete e.creditHours;
        return e;
      });
    }
  };

  // ================= LOAD =================
  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await getCourses();
      setCourses(res?.data || res || []);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res?.data || res || []);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  useEffect(() => {
    loadCourses();
    loadDepartments();
  }, []);

  // ================= SEARCH =================
  const filteredCourses = courses.filter((c) =>
    String(c.courseName ?? c.CourseName ?? "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= OPEN CREATE =================
  const openCreate = () => {
    setCourseName("");
    setCreditHours("");
    setDepartmentId("");
    setEditId(null);
    setIsEdit(false);
    setErrors({});
    setShowModal(true);
  };

  // ================= OPEN EDIT =================
  const openEdit = (c) => {
    setCourseName(c.courseName ?? c.CourseName);
    setCreditHours(c.creditHours ?? c.CreditHours);
    setDepartmentId(c.departmentId ?? c.DepartmentId);

    setEditId(c.id ?? c.Id);
    setIsEdit(true);
    setErrors({});
    setShowModal(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (Object.keys(errors).length > 0) return;

    if (!courseName || !creditHours || !departmentId) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        courseName,
        creditHours: Number(creditHours),
        departmentId: Number(departmentId),
      };

      if (isEdit) {
        await updateCourse(editId, payload);
        Swal.fire("Success", "Course Updated", "success");
      } else {
        await createCourse(payload);
        Swal.fire("Success", "Course Created", "success");
      }

      setShowModal(false);
      setIsEdit(false);
      setEditId(null);

      loadCourses();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCourse(id);
      Swal.fire("Deleted", "Course removed", "success");
      loadCourses();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // ================= UI =================
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold">Courses</h1>
            <p className="text-gray-500">
              Total: {filteredCourses.length}
            </p>
          </div>
        </div>

        <button
          onClick={openCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add Course
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-5 w-80 relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search course..."
          className="w-full pl-10 border rounded-lg py-2"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Course</th>
              <th className="p-3">Credit Hours</th>
              <th className="p-3">Department</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-5">
                  Loading...
                </td>
              </tr>
            ) : filteredCourses.length > 0 ? (
              filteredCourses.map((c) => {
                const dept = departments.find(
                  (d) => (d.id ?? d.Id) === (c.departmentId ?? c.DepartmentId)
                );

                return (
                  <tr key={c.id ?? c.Id} className="border-b">
                    <td className="p-3">{c.id ?? c.Id}</td>
                    <td className="p-3">{c.courseName ?? c.CourseName}</td>
                    <td className="p-3">{c.creditHours ?? c.CreditHours}</td>
                    <td className="p-3">
                      {dept?.name ?? dept?.Name ?? "Unknown"}
                    </td>

                    <td className="p-3 flex gap-2">
                      <button onClick={() => openEdit(c)} className="text-blue-600 p-2">
                        <Pencil size={18} />
                      </button>

                      <button onClick={() => handleDelete(c.id ?? c.Id)} className="text-red-600 p-2">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-5">
                  No Courses Found
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
            <motion.div className="bg-white p-6 rounded-xl w-[400px]">

              <h2 className="text-xl font-bold mb-4">
                {isEdit ? "Update Course" : "Add Course"}
              </h2>

              {/* COURSE NAME */}
              <input
                className="w-full border p-2 rounded"
                placeholder="Course Name"
                value={courseName}
                onChange={(e) => handleCourseName(e.target.value)}
              />
              {errors.courseName && (
                <p className="text-red-600 text-sm mb-2">
                  {errors.courseName}
                </p>
              )}

              {/* CREDIT HOURS */}
              <input
                className="w-full border p-2 rounded mt-3"
                placeholder="Credit Hours"
                value={creditHours}
                onChange={(e) => handleCreditHours(e.target.value)}
              />
              {errors.creditHours && (
                <p className="text-red-600 text-sm mb-2">
                  {errors.creditHours}
                </p>
              )}

              {/* DEPARTMENT */}
              <select
                className="w-full border p-2 rounded mt-3"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d.id ?? d.Id} value={d.id ?? d.Id}>
                    {d.name ?? d.Name}
                  </option>
                ))}
              </select>

              {/* BUTTONS */}
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowModal(false)} className="border px-3 py-2 rounded">
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="bg-blue-600 text-white px-3 py-2 rounded"
                >
                  {saving ? "Saving..." : isEdit ? "Update" : "Save"}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}