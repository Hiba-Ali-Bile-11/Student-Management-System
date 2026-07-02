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

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // LOAD
  const loadCourses = async () => {
    setLoading(true);
    const res = await getCourses();
    setCourses(res?.data || res || []);
    setLoading(false);
  };

  const loadDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res?.data || res || []);
  };

  useEffect(() => {
    loadCourses();
    loadDepartments();
  }, []);

  // SEARCH
  const filteredCourses = courses.filter((c) =>
    `${c.courseName ?? c.CourseName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // PAGINATION
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCourses.length / rowsPerPage);

  // OPEN CREATE
  const openCreate = () => {
    setCourseName("");
    setCreditHours("");
    setDepartmentId("");
    setIsEdit(false);
    setEditId(null);
    setShowModal(true);
  };

  // OPEN EDIT
  const openEdit = (c) => {
    setCourseName(c.courseName ?? c.CourseName);
    setCreditHours(c.creditHours ?? c.CreditHours);
    setDepartmentId(c.departmentId ?? c.DepartmentId);

    setEditId(c.id ?? c.Id);
    setIsEdit(true);
    setShowModal(true);
  };

  // SUBMIT
  const handleSubmit = async () => {
    if (!courseName || !creditHours || !departmentId) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    const payload = {
      courseName,
      creditHours: Number(creditHours),
      departmentId: Number(departmentId),
    };

    setSaving(true);

    if (isEdit) {
      await updateCourse(editId, payload);
      Swal.fire("Success", "Course Updated", "success");
    } else {
      await createCourse(payload);
      Swal.fire("Success", "Course Created", "success");
    }

    setShowModal(false);
    loadCourses();
    setSaving(false);
  };

  // DELETE
  const handleDelete = async (id) => {
    const res = await Swal.fire({
      title: "Delete Course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!res.isConfirmed) return;

    await deleteCourse(id);
    loadCourses();
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">

      {/* HEADER (SAME AS STUDENT) */}
      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-lg">
            <BookOpen className="text-white" size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#1E3A8A]">
              Courses
            </h1>
            <p className="text-[#2563EB]">
              Total: {filteredCourses.length}
            </p>
          </div>
        </div>

        <button
          onClick={openCreate}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white shadow-lg hover:scale-105 transition-all"
        >
          <Plus size={18} /> Add Course
        </button>
      </div>

      {/* SEARCH (SAME STYLE) */}
      <div className="mb-6 w-96 relative">
        <Search className="absolute left-4 top-3 text-[#2563EB]" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search course..."
          className="w-full pl-11 py-3 rounded-xl border border-blue-200 bg-white focus:ring-4 focus:ring-cyan-300 outline-none shadow-sm"
        />
      </div>

      {/* TABLE (SAME STYLE FEEL) */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <table className="w-full min-w-[900px]">

          <thead className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Course</th>
              <th className="p-4">Credit Hours</th>
              <th className="p-4">Department</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : currentCourses.length > 0 ? (
              currentCourses.map((c) => {
                const dept = departments.find(
                  (d) => (d.id ?? d.Id) === (c.departmentId ?? c.DepartmentId)
                );

                return (
                  <tr key={c.id ?? c.Id} className="border-b hover:bg-blue-50">

                    <td className="p-4">{c.id ?? c.Id}</td>
                    <td className="p-4">{c.courseName ?? c.CourseName}</td>
                    <td className="p-4">{c.creditHours ?? c.CreditHours}</td>
                    <td className="p-4">{dept?.name ?? dept?.Name}</td>

                    <td className="p-4 flex gap-2">

                      <button
                        onClick={() => openEdit(c)}
                        className="w-10 h-10 rounded-lg bg-blue-100 text-[#2563EB] hover:bg-[#2563EB] hover:text-white flex items-center justify-center"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(c.id ?? c.Id)}
                        className="w-10 h-10 rounded-lg bg-red-100 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center"
                      >
                        <Trash2 size={18} />
                      </button>

                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No Courses Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION (SAME STYLE AS STUDENT) */}
      <div className="flex justify-center items-center gap-3 mt-6">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 rounded-lg border border-blue-200 text-[#1E3A8A] disabled:opacity-40"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === i + 1
                ? "bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white"
                : "border border-blue-200 text-[#1E3A8A]"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 rounded-lg border border-blue-200 text-[#1E3A8A] disabled:opacity-40"
        >
          Next
        </button>

      </div>

      {/* MODAL (SAME STYLE SYSTEM) */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            <motion.div className="bg-white rounded-3xl p-8 w-[500px]">

              <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
                {isEdit ? "Update Course" : "Add Course"}
              </h2>

              <input
                className="w-full mt-3 p-3 rounded-xl border border-blue-200"
                placeholder="Course Name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />

              <input
                className="w-full mt-3 p-3 rounded-xl border border-blue-200"
                placeholder="Credit Hours"
                value={creditHours}
                onChange={(e) => setCreditHours(e.target.value)}
              />

              <select
                className="w-full mt-3 p-3 rounded-xl border border-blue-200"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              >
                <option>Select Department</option>
                {departments.map((d) => (
                  <option key={d.id ?? d.Id} value={d.id ?? d.Id}>
                    {d.name ?? d.Name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 rounded-xl border"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white"
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