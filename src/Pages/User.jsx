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
  getAllUsers,
  deleteUser,
  searchUser,
} from "../services/user-service";

import { Link, useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= PAGINATION =================
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // ================= LOAD USERS =================
  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res?.data || []);
    } catch (err) {
      console.log(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
      setCurrentPage(1); // reset like course style
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ================= SEARCH =================
  const handleSearch = async (value) => {
    setSearch(value);
    setCurrentPage(1);

    if (value.trim() === "") {
      loadUsers();
      return;
    }

    try {
      setLoading(true);
      const res = await searchUser(value);
      setUsers(res?.data || []);
    } catch (err) {
      console.log(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      console.log(err.message);
    }
  };

  // ================= PAGINATION LOGIC (COURSE STYLE) =================
  const filteredUsers = users.filter((u) =>
    `${u.username ?? u.Username}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const paginatedUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  return (
    <div className="min-h-screen bg-blue-50 p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-lg">
            <Users className="text-white" size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#1E3A8A]">
              Users
            </h1>
            <p className="text-[#2563EB]">
              Total: {filteredUsers.length}
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/CreateUser"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white shadow-lg hover:scale-105 transition-all"
        >
          <Plus size={18} /> Add User
        </Link>

      </div>

      {/* SEARCH */}
      <div className="mb-6 w-96 relative">
        <Search className="absolute left-4 top-3 text-[#2563EB]" />

        <input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search user..."
          className="w-full pl-11 py-3 rounded-xl border border-blue-200 bg-white focus:ring-4 focus:ring-cyan-300 outline-none shadow-sm"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

        <table className="w-full min-w-[900px]">

          <thead className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Username</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : paginatedUsers.length > 0 ? (
              paginatedUsers.map((u) => (
                <tr key={u.id ?? u.Id} className="border-b hover:bg-blue-50">

                  <td className="p-4">{u.id ?? u.Id}</td>
                  <td className="p-4">{u.username ?? u.Username}</td>
                  <td className="p-4">{u.email ?? u.Email}</td>
                  <td className="p-4">{u.role ?? u.Role}</td>

                  <td className="p-4 flex gap-2">

                    <button className="w-10 h-10 rounded-lg bg-blue-100 text-[#2563EB] hover:bg-[#2563EB] hover:text-white flex items-center justify-center">
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/dashboard/updateUser/${u.id ?? u.Id}`)
                      }
                      className="w-10 h-10 rounded-lg bg-blue-100 text-[#2563EB] hover:bg-[#2563EB] hover:text-white flex items-center justify-center"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(u.id ?? u.Id)}
                      className="w-10 h-10 rounded-lg bg-red-100 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center"
                    >
                      <Trash2 size={18} />
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No Users Found
                </td>
              </tr>
            )}

          </tbody>

        </table>
      </div>

      {/* PAGINATION (COURSE STYLE) */}
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

    </div>
  );
}