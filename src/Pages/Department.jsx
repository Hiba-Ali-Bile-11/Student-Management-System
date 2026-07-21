import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

import {
  getDepartments,
  deleteDepartment,
  createDepartment,
  updateDepartment,
} from "../services/department-service";

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [departmentName, setDepartmentName] = useState("");

  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // LOAD DATA
  const loadDepartments = async () => {
    setLoading(true);
    const res = await getDepartments();
    setDepartments(res?.data || res || []);
    setLoading(false);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  // SEARCH
  const filtered = departments.filter((d) =>
    String(d.name ?? d.Name ?? "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // RESET PAGE WHEN SEARCH
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // PAGINATION
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;

  const currentDepartments = filtered.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

  // SAFE PAGE FIX
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  // OPEN CREATE
  const openCreate = () => {
    setDepartmentName("");
    setEditId(null);
    setIsEdit(false);
    setShowModal(true);
  };

  // OPEN EDIT
  const openEdit = (d) => {
    setDepartmentName(d.name ?? d.Name);
    setEditId(d.id ?? d.Id);
    setIsEdit(true);
    setShowModal(true);
  };

  // SUBMIT
  const handleSubmit = async () => {
    if (!departmentName.trim()) {
      Swal.fire("Error", "Department name required", "error");
      return;
    }

    setSaving(true);

    const payload = { name: departmentName };

    if (isEdit) {
      await updateDepartment(editId, payload);
      Swal.fire("Success", "Updated successfully", "success");
    } else {
      await createDepartment(payload);
      Swal.fire("Success", "Created successfully", "success");
    }

    setShowModal(false);
    loadDepartments();
    setSaving(false);
  };

  // DELETE
  const handleDelete = async (id) => {
    const res = await Swal.fire({
      title: "Delete Department?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!res.isConfirmed) return;

    await deleteDepartment(id);
    loadDepartments();
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-lg">
            <Building2 className="text-white" size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#1E3A8A]">
              Departments
            </h1>
            <p className="text-[#2563EB]">
              Total: {filtered.length}
            </p>
          </div>
        </div>

        <button
          onClick={openCreate}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white shadow-lg hover:scale-105 transition-all"
        >
          <Plus size={18} /> Add Department
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6 w-96 relative">
        <Search className="absolute left-4 top-3 text-[#2563EB]" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search department..."
          className="w-full pl-11 py-3 rounded-xl border border-blue-200 bg-white focus:ring-4 focus:ring-cyan-300 outline-none shadow-sm"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <table className="w-full min-w-[700px]">

          <thead className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Department Name</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : currentDepartments.length > 0 ? (
              currentDepartments.map((d) => (
                <tr key={d.id ?? d.Id} className="border-b hover:bg-blue-50">

                  <td className="p-4">{d.id ?? d.Id}</td>
                  <td className="p-4">{d.name ?? d.Name}</td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => openEdit(d)}
                      className="w-10 h-10 rounded-lg bg-blue-100 text-[#2563EB] hover:bg-[#2563EB] hover:text-white flex items-center justify-center"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(d.id ?? d.Id)}
                      className="w-10 h-10 rounded-lg bg-red-100 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center"
                    >
                      <Trash2 size={18} />
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-6 text-gray-500">
                  No Departments Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-3 mt-6">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 rounded-lg border border-blue-200 text-[#1E3A8A] disabled:opacity-40"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
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

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            <motion.div className="bg-white p-8 rounded-3xl w-[400px]">

              <h2 className="text-2xl font-bold text-[#1E3A8A] mb-5">
                {isEdit ? "Update Department" : "Add Department"}
              </h2>

              <input
                className="w-full mt-3 p-3 rounded-xl border border-blue-200"
                placeholder="Department Name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />

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
