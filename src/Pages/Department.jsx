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

    const [errors, setErrors] = useState({});

    // ================= VALIDATION =================
    const isOnlyLetters = (v) => /^[a-zA-Z\s]+$/.test(v);

    const handleDepartmentName = (value) => {
        setDepartmentName(value);

        if (!value.trim()) {
            setErrors((p) => ({
                ...p,
                departmentName: "Department name is required",
            }));
        } else if (!isOnlyLetters(value)) {
            setErrors((p) => ({
                ...p,
                departmentName: "Only letters are allowed (no numbers)",
            }));
        } else {
            setErrors((p) => {
                const e = { ...p };
                delete e.departmentName;
                return e;
            });
        }
    };

    // ================= LOAD =================
    const loadDepartments = async () => {
        try {
            setLoading(true);
            const res = await getDepartments();
            setDepartments(res?.data || res || []);
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDepartments();
    }, []);

    // ================= SEARCH =================
    const filtered = departments.filter((d) =>
        String(d.name ?? d.Name ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // ================= OPEN =================
    const openCreate = () => {
        setDepartmentName("");
        setEditId(null);
        setIsEdit(false);
        setErrors({});
        setShowModal(true);
    };

    const openEdit = (d) => {
        setDepartmentName(d.name ?? d.Name);
        setEditId(d.id ?? d.Id);
        setIsEdit(true);
        setErrors({});
        setShowModal(true);
    };

    // ================= SUBMIT =================
    const handleSubmit = async () => {
        if (errors.departmentName) return;

        if (!departmentName.trim()) {
            setErrors({ departmentName: "Department name is required" });
            return;
        }

        try {
            setSaving(true);

            const payload = { name: departmentName };

            if (isEdit) {
                await updateDepartment(editId, payload);
                Swal.fire("Updated", "Department updated successfully", "success");
            } else {
                await createDepartment(payload);
                Swal.fire("Created", "Department created successfully", "success");
            }

            setShowModal(false);
            setDepartmentName("");
            loadDepartments();
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        } finally {
            setSaving(false);
        }
    };

    // ================= DELETE =================
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

    // ================= UI =================
    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                    <Building2 className="text-blue-600" />
                    <h1 className="text-2xl font-bold">Departments</h1>
                </div>

                <button
                    onClick={openCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2"
                >
                    <Plus size={18} /> Add department
                </button>
            </div>

            {/* SEARCH */}
            <div className="mb-4 w-80 relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" />
                <input
                    className="w-full pl-10 border p-2 rounded"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow overflow-x-auto">
  <table className="w-full min-w-[700px]">

    <thead className="bg-blue-600 text-white">
      <tr>
        <th className="p-3">ID</th>
        <th className="p-3">Department Name</th>
        <th className="p-3">Actions</th>
      </tr>
    </thead>

    <tbody>
      {loading ? (
        <tr>
          <td colSpan="3" className="text-center p-5">
            Loading...
          </td>
        </tr>
      ) : filtered.length > 0 ? (
        filtered.map((d) => (
          <tr key={d.id ?? d.Id} className="border-b hover:bg-gray-50 transition">

            <td className="p-3">
              {d.id ?? d.Id}
            </td>

            <td className="p-3">
              {d.name ?? d.Name}
            </td>

            <td className="p-3">
              <div className="flex gap-2">

                <button
                  onClick={() => openEdit(d)}
                  className="text-blue-600 p-2 hover:bg-blue-100 rounded"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => handleDelete(d.id ?? d.Id)}
                  className="text-red-600 p-2 hover:bg-red-100 rounded"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            </td>

          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="3" className="text-center p-5">
            No Departments Found
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

                        <motion.div className="bg-white p-5 rounded w-[400px]">

                            <h2 className="text-xl font-bold mb-3">
                                {isEdit ? "Update Department" : "Create Department"}
                            </h2>

                            <input
                                className={`w-full border p-2 rounded ${errors.departmentName ? "border-red-500" : ""
                                    }`}
                                value={departmentName}
                                onChange={(e) => handleDepartmentName(e.target.value)}
                                placeholder="Only letters allowed"
                            />

                            {errors.departmentName && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.departmentName}
                                </p>
                            )}

                            <div className="flex justify-end gap-2 mt-3">
                                <button onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSubmit}
                                    disabled={saving || !!errors.departmentName}
                                    className="bg-blue-600 text-white px-3 py-2 rounded"
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