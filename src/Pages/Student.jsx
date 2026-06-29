import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import {
  getAllStudents,
  deleteStudent,
  searchStudent,
} from "../services/student-service";

import { Link } from "react-router-dom";

export default function Student() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // LOAD ALL STUDENTS
  // =========================
  const loadStudents = async () => {
    try {
      setLoading(true);
      const res = await getAllStudents();

      setStudents(res?.data || []);
    } catch (err) {
      console.log(err.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // =========================
  // SEARCH
  // =========================
  const handleSearch = async (value) => {
    setSearch(value);

    if (value.trim() === "") {
      loadStudents();
      return;
    }

    try {
      setLoading(true);
      const res = await searchStudent(value);

      setStudents(res?.data || []);
    } catch (err) {
      console.log(err.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;

    try {
      await deleteStudent(id);
      loadStudents();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-3">
          <Users className="text-blue-600" size={30} />

          <div>
            <h1 className="text-3xl font-bold">Students</h1>
            <p className="text-gray-500">
              Total Students: {students.length}
            </p>
          </div>
        </div>

        {/* <button  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
          <Plus size={18} />
          Add Student
        </button> */}
        <Link
          to="/dashboard/CreateStudent"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          {/* + Create Course */}
          <Plus size={18} />
          Add Student
        </Link>

      </div>

      {/* SEARCH */}
      <div className="relative mb-6 w-full md:w-96">

        <Search className="absolute left-3 top-3 text-gray-400" size={18} />

        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search student..."
          className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Age</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Parent Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3">Department</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="9" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : students.length > 0 ? (
              students.map((s) => (
                <tr key={s.id ?? s.Id} className="border-b hover:bg-gray-50">

                  <td className="p-3">{s.id ?? s.Id}</td>

                  {/* FULL NAME */}
                  <td className="p-3 font-medium">
                    {(s.firstName ?? s.FirstName)}{" "}
                    {(s.lastName ?? s.LastName)}
                  </td>

                  <td className="p-3">{s.gender ?? s.Gender}</td>
                  <td className="p-3">{s.age ?? s.Age}</td>
                  <td className="p-3">{s.phone ?? s.Phone}</td>
                  <td className="p-3">{s.parentPhone ?? s.ParentPhone}</td>
                  <td className="p-3">{s.address ?? s.Address}</td>
                  <td className="p-3">{s.departmentId ?? s.DepartmentId}</td>

                  {/* ACTIONS */}
                  <td className="p-3">
                    <div className="flex justify-center gap-2">

                      <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg">
                        <Eye size={18} />
                      </button>

                      {/* <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                        <Pencil size={18} />
                      </button> */}
                       <button
        onClick={() => navigate(`/dashboard/updateStudent/${student.id}`)}
        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
      >
        <Pencil size={18} />
         </button> 

                      <button
                        onClick={() => handleDelete(s.id ?? s.Id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center p-6 text-gray-500">
                  No students found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}