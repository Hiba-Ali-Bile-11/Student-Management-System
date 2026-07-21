import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
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
  <div className="min-h-screen bg-blue-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8 transition-colors duration-300">

    {/* HEADER */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8">

      <div className="flex items-center gap-3 sm:gap-4">

        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] flex items-center justify-center shadow-lg">
          <Users className="text-white" size={26} />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] dark:text-white">
            Users
          </h1>

          <p className="text-sm sm:text-base text-[#2563EB] dark:text-blue-300">
            Total: {filteredUsers.length}
          </p>
        </div>

      </div>


      <Link
        to="/dashboard/CreateUser"
        className="w-full md:w-auto justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white shadow-lg hover:scale-105 transition-all flex items-center gap-2"
      >
        <Plus size={18}/>
        Add User
      </Link>

    </div>


    {/* SEARCH */}
    <div className="mb-6 w-full md:w-96 relative">

      <Search className="absolute left-4 top-3 text-[#2563EB]" />

      <input
        value={search}
        onChange={(e)=>handleSearch(e.target.value)}
        placeholder="Search user..."
        className="
        w-full pl-11 py-3 rounded-xl
        bg-white dark:bg-gray-900
        text-gray-800 dark:text-white
        placeholder-gray-400
        border border-blue-200 dark:border-gray-700
        focus:ring-4 focus:ring-cyan-300
        outline-none shadow-sm
        "
      />

    </div>



    {/* TABLE */}
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-x-auto">

      <table className="w-full min-w-[700px]">

        <thead className="bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white">

          <tr>

            <th className="p-3 sm:p-4 text-sm sm:text-base">ID</th>
            <th className="p-3 sm:p-4 text-sm sm:text-base">Username</th>
            <th className="p-3 sm:p-4 text-sm sm:text-base">Email</th>
            <th className="p-3 sm:p-4 text-sm sm:text-base">Role</th>
            <th className="p-3 sm:p-4 text-sm sm:text-base">Actions</th>

          </tr>

        </thead>


        <tbody>

          {loading ? (

            <tr>
              <td colSpan="5" className="text-center p-6 text-gray-800 dark:text-gray-200">
                Loading...
              </td>
            </tr>


          ) : paginatedUsers.length > 0 ? (

            paginatedUsers.map((u)=>(

              <tr
                key={u.id ?? u.Id}
                className="
                border-b border-gray-200 dark:border-gray-700
                hover:bg-blue-50 dark:hover:bg-gray-800
                "
              >

                <td className="p-3 sm:p-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                  {u.id ?? u.Id}
                </td>


                <td className="p-3 sm:p-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                  {u.username ?? u.Username}
                </td>


                <td className="p-3 sm:p-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                  {u.email ?? u.Email}
                </td>


                <td className="p-3 sm:p-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                  {u.role ?? u.Role}
                </td>


                <td className="p-3 sm:p-4 flex gap-2 whitespace-nowrap">


                  <button
                    onClick={() =>
                      navigate(`/dashboard/updateUser/${u.id ?? u.Id}`)
                    }
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-100 dark:bg-gray-700 text-[#2563EB] hover:bg-[#2563EB] hover:text-white flex items-center justify-center"
                  >
                    <Pencil size={17}/>
                  </button>


                  <button
                    onClick={()=>handleDelete(u.id ?? u.Id)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center"
                  >
                    <Trash2 size={17}/>
                  </button>


                </td>


              </tr>

            ))

          ) : (

            <tr>

              <td 
                colSpan="5"
                className="text-center p-6 text-gray-500 dark:text-gray-400"
              >
                No Users Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>



    {/* PAGINATION */}

    <div className="flex flex-wrap justify-center items-center gap-2 mt-6">


      <button
        disabled={currentPage===1}
        onClick={()=>setCurrentPage(p=>p-1)}
        className="px-3 sm:px-4 py-2 rounded-lg border border-blue-200 dark:border-gray-700 text-[#1E3A8A] dark:text-white disabled:opacity-40"
      >
        Previous
      </button>



      {[...Array(totalPages)].map((_,i)=>(

        <button
          key={i}
          onClick={()=>setCurrentPage(i+1)}
          className={`px-3 sm:px-4 py-2 rounded-lg ${
            currentPage===i+1
            ? "bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] text-white"
            : "border border-blue-200 dark:border-gray-700 text-[#1E3A8A] dark:text-white"
          }`}
        >
          {i+1}
        </button>

      ))}



      <button
        disabled={currentPage===totalPages}
        onClick={()=>setCurrentPage(p=>p+1)}
        className="px-3 sm:px-4 py-2 rounded-lg border border-blue-200 dark:border-gray-700 text-[#1E3A8A] dark:text-white disabled:opacity-40"
      >
        Next
      </button>


    </div>


  </div>
);
}