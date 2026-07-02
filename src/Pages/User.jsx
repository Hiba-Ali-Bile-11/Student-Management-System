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

  // =========================
  // LOAD USERS
  // =========================
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
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // =========================
  // SEARCH USER
  // =========================
  const handleSearch = async (value) => {
    setSearch(value);

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

  // =========================
  // DELETE USER
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      loadUsers();
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
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-gray-500">
              Total Users: {users.length}
            </p>
          </div>
        </div>

        <Link
          to="/dashboard/CreateUser"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} />
          Add User
        </Link>

      </div>

      {/* SEARCH */}
      <div className="relative mb-6 w-full md:w-96">

        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Username</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((u) => (
                <tr
                  key={u.id ?? u.Id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">
                    {u.id ?? u.Id}
                  </td>

                  <td className="p-3 font-medium">
                    {u.username ?? u.Username}
                  </td>

                  <td className="p-3">
                    {u.email ?? u.Email}
                  </td>

                  <td className="p-3">
                    {u.role ?? u.Role}
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-2">

                      <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg">
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/dashboard/updateUser/${u.id ?? u.Id}`)
                        }
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(u.id ?? u.Id)}
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
                <td
                  colSpan="5"
                  className="text-center p-6 text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}