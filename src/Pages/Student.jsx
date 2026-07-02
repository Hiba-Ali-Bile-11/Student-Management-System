import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

import {
  getAllStudents,createStudent,updateStudent,deleteStudent,} from "../services/student-service";

import { getDepartments } from "../services/department-service";
import { getCourses } from "../services/course-service";

export default function Student() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [gender, setGender] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [courseId, setCourseId] = useState("");

  const [errors, setErrors] = useState({});


  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);



  // ================= LOAD =================
  const loadStudents = async () => {
    try {
      setLoading(true);
      const res = await getAllStudents();
      setStudents(res?.data || res || []);
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

  const loadCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res?.data || res || []);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  useEffect(() => {
  loadStudents();
  loadDepartments();
  loadCourses();
}, []);

// ================= SEARCH =================
const filteredStudents = students.filter((s) =>
  `${s.firstName ?? s.FirstName ?? ""} ${s.lastName ?? s.LastName ?? ""}`
    .toLowerCase()
    .includes(search.toLowerCase())
);

// ================= RESET PAGE ON SEARCH =================
useEffect(() => {
  setCurrentPage(1);
}, [search]);

// ================= PAGINATION =================
const indexOfLast = currentPage * rowsPerPage;
const indexOfFirst = indexOfLast - rowsPerPage;

const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

// ================= SAFE PAGE FIX =================
useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(totalPages || 1);
  }
}, [filteredStudents]);

  // ================= OPEN CREATE =================
  const openCreate = () => {
    setFirstName("");
    setLastName("");
    setAddress("");
    setAge("");
    setPhone("");
    setParentPhone("");
    setGender("");
    setDepartmentId("");
    setCourseId("");

    setEditId(null);
    setIsEdit(false);
    setShowModal(true);
    setErrors({});
  };

  // ================= OPEN EDIT =================
  const openEdit = (s) => {
    setFirstName(s.firstName ?? s.FirstName);
    setLastName(s.lastName ?? s.LastName);
    setAddress(s.address ?? s.Address);
    setAge(s.age ?? s.Age);
    setPhone(s.phone ?? s.Phone);
    setParentPhone(s.parentPhone ?? s.ParentPhone);
    setGender(s.gender ?? s.Gender);
    setDepartmentId(s.departmentId ?? s.DepartmentId);
    setCourseId(s.courseId ?? s.CourseId);

    setEditId(s.id ?? s.Id);
    setIsEdit(true);
    setShowModal(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (
      !firstName ||
      !lastName ||
      !address ||
      !age ||
      !phone ||
      !parentPhone ||
      !gender ||
      !departmentId ||
      !courseId
    ) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        firstName,
        lastName,
        address,
        age: Number(age),
        phone,
        parentPhone,
        gender,
        departmentId: Number(departmentId),
        courseId: Number(courseId),
      };

      if (isEdit) {
        await updateStudent(editId, payload);
        Swal.fire("Success", "Student Updated", "success");
      } else {
        await createStudent(payload);
        Swal.fire("Success", "Student Created", "success");
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
    const result = await Swal.fire({
      title: "Delete Student?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteStudent(id);
      Swal.fire("Deleted", "Student removed", "success");
      loadStudents();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

 return (
  <div className="min-h-screen bg-blue-50 p-8">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-8">

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-lg">
          <User className="text-white" size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-[#1E3A8A]">
            Students
          </h1>
          <p className="text-[#2563EB]">
            Total: {filteredStudents.length}
          </p>
        </div>
      </div>

      <button
        onClick={openCreate}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white flex items-center gap-2 shadow-lg hover:scale-105 transition-all duration-300"
      >
        <Plus size={18} />
        Add Student
      </button>
    </div>

    {/* SEARCH */}
    <div className="mb-6 w-96 relative">
      <Search className="absolute left-4 top-3 text-[#2563EB]" />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search student..."
        className="w-full pl-11 py-3 rounded-xl border border-blue-200 bg-white focus:ring-4 focus:ring-cyan-300 focus:border-[#2563EB] outline-none shadow-sm"
      />
    </div>

    {/* TABLE */}
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <table className="w-full min-w-[900px]">

        <thead className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Address</th>
            <th className="p-4">Age</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Parent Phone</th>
            <th className="p-4">Gender</th>
            <th className="p-4">Department</th>
            <th className="p-4">Course</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
  {loading ? (
    <tr>
      <td colSpan="10" className="text-center p-6 text-gray-500">
        Loading...
      </td>
    </tr>
  ) : currentStudents.length > 0 ? (
    currentStudents.map((s) => {
      const dept = departments.find(
        (d) => (d.id ?? d.Id) === (s.departmentId ?? s.DepartmentId)
      );

      const course = courses.find(
        (c) => (c.id ?? c.Id) === (s.courseId ?? s.CourseId)
      );

              return (
                <tr
                  key={s.id ?? s.Id}
                  className="border-b hover:bg-blue-50 transition-all duration-300"
                >
                  <td className="p-4 text-gray-700">{s.id ?? s.Id}</td>

                  <td className="p-4 text-gray-700">
                    {s.firstName ?? s.FirstName} {s.lastName ?? s.LastName}
                  </td>

                  <td className="p-4 text-gray-700">
                    {s.address ?? s.Address}
                  </td>

                  <td className="p-4 text-gray-700">
                    {s.age ?? s.Age}
                  </td>

                  <td className="p-4 text-gray-700">
                    {s.phone ?? s.Phone}
                  </td>

                  <td className="p-4 text-gray-700">
                    {s.parentPhone ?? s.ParentPhone}
                  </td>

                  <td className="p-4 text-gray-700">
                    {s.gender ?? s.Gender}
                  </td>

                  <td className="p-4 text-gray-700">
                    {dept?.name ?? dept?.Name}
                  </td>

                  <td className="p-4 text-gray-700">
                    {course?.courseName ?? course?.CourseName}
                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => openEdit(s)}
                      className="w-10 h-10 rounded-lg bg-blue-100 text-[#2563EB] hover:bg-[#2563EB] hover:text-white flex items-center justify-center transition-all"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(s.id ?? s.Id)}
                      className="w-10 h-10 rounded-lg bg-red-100 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Trash2 size={18} />
                    </button>

                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="10" className="text-center p-6 text-gray-500">
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

          <motion.div className="bg-white rounded-3xl shadow-[0_30px_80px_rgba(37,99,235,.25)] p-8 w-[500px]">

            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
              {isEdit ? "Update Student" : "Add Student"}
            </h2>

            <input className="w-full mt-3 p-3 rounded-xl border border-blue-200 focus:ring-4 focus:ring-cyan-300 focus:border-[#2563EB] outline-none"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input className="w-full mt-3 p-3 rounded-xl border border-blue-200 focus:ring-4 focus:ring-cyan-300 focus:border-[#2563EB] outline-none"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <input className="w-full mt-3 p-3 rounded-xl border border-blue-200 focus:ring-4 focus:ring-cyan-300 focus:border-[#2563EB] outline-none"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input className="w-full mt-3 p-3 rounded-xl border border-blue-200 focus:ring-4 focus:ring-cyan-300 focus:border-[#2563EB] outline-none"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <input className="w-full mt-3 p-3 rounded-xl border border-blue-200 focus:ring-4 focus:ring-cyan-300 focus:border-[#2563EB] outline-none"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input className="w-full mt-3 p-3 rounded-xl border border-blue-200 focus:ring-4 focus:ring-cyan-300 focus:border-[#2563EB] outline-none"
              placeholder="Parent Phone"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
            />

            {/* GENDER */}
            <div className="mt-4 text-gray-700">
              <label className="mr-4">
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                /> Male
              </label>

              <label>
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                /> Female
              </label>
            </div>

            {/* DEPARTMENT */}
            <select
              className="w-full mt-3 p-3 rounded-xl border border-blue-200 focus:ring-4 focus:ring-cyan-300 focus:border-[#2563EB] outline-none"
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

            {/* COURSE */}
            <select
              className="w-full mt-3 p-3 rounded-xl border border-blue-200 focus:ring-4 focus:ring-cyan-300 focus:border-[#2563EB] outline-none"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              <option>Select Course</option>
              {courses.map((c) => (
                <option key={c.id ?? c.Id} value={c.id ?? c.Id}>
                  {c.courseName ?? c.CourseName}
                </option>
              ))}
            </select>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-3 rounded-xl border border-blue-200 text-[#1E3A8A] hover:bg-blue-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white shadow-lg hover:scale-105 transition-all"
              >
                {saving ? "Saving..." : isEdit ? "Update" : "Save"}
              </button>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* PAGINATION */}
<div className="flex justify-center items-center gap-3 mt-6">

  {/* PREVIOUS */}
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    className="px-4 py-2 rounded-lg border border-blue-200 text-[#1E3A8A] disabled:opacity-40 hover:bg-blue-50"
  >
    Previous
  </button>

  {/* PAGE NUMBERS */}
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

  {/* NEXT */}
  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
    className="px-4 py-2 rounded-lg border border-blue-200 text-[#1E3A8A] disabled:opacity-40 hover:bg-blue-50"
  >
    Next
  </button>

</div>

  </div>
);
}