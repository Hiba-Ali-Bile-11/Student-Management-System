import React from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function User() {
  const users = [
    {
      id: 1,
      username: "admin",
      email: "admin@gmail.com",
      role: "Admin",
      createdAt: "2026-06-25",
    },
    {
      id: 2,
      username: "hiba",
      email: "hiba@gmail.com",
      role: "Student",
      createdAt: "2026-06-25",
    },
    {
      id: 3,
      username: "ahmed",
      email: "ahmed@gmail.com",
      role: "Teacher",
      createdAt: "2026-06-25",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Users Management
        </h1>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search user..."
            className="w-full border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Id</th>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3">{user.id}</td>

                <td className="px-4 py-3 font-medium">
                  {user.username}
                </td>

                <td className="px-4 py-3">{user.email}</td>

                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {user.createdAt}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
                      <Eye size={16} />
                    </button>

                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg">
                      <Pencil size={16} />
                    </button>

                    <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}