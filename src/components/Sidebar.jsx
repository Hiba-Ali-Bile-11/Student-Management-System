import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,Users,GraduationCap,Building2,BookOpen,ClipboardList,KeyRound,LogOut,
} from "lucide-react";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-3 rounded-lg bg-blue-600 text-white"
      : "block px-4 py-3 rounded-lg hover:bg-slate-800 text-white";

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">SMS</h1>
        <p className="text-gray-400 text-sm">
          Student Management System
        </p>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">
        <NavLink to="/dashboard" end className={linkClass}> <LayoutDashboard size={20} />
  Dashboard
</NavLink>

<NavLink to="/dashboard/users" className={linkClass}> <Users size={20} />
  Users
</NavLink>

        {/* <NavLink to="/DashStatus" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/users" className={linkClass}>
          Users
        </NavLink> */}

        <NavLink to="/dashboard/students" className={linkClass}> <GraduationCap size={20} />
          Students
        </NavLink>

        <NavLink to="/dashboard/department" className={linkClass}> <Building2 size={20} />
  Departments
</NavLink>

        <NavLink to="/dashboard/Course" className={linkClass}> <BookOpen size={20} />
          Courses
        </NavLink>

        <NavLink to="/enrollments" className={linkClass}> <ClipboardList size={20} /> 
          Enrollments
        </NavLink>

        <NavLink to="/change-password" className={linkClass}> <KeyRound size={20} /> 
          Change Password
        </NavLink>

        <NavLink
          to="/dashboard/Logout"
          className="block px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800"
        > <LogOut size={20}  /> 
          Logout
        </NavLink>

      </nav>
    </aside>
  );
}

export default Sidebar;