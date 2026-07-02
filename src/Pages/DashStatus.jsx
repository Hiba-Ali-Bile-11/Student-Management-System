import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Users,
} from "lucide-react";

import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

import { getAllStudents } from "../services/student-service";
import { getDepartments } from "../services/department-service";
import { getCourses } from "../services/course-service";
import { getAllUsers } from "../services/user-service";

export default function DashStatus() {

  const [stats, setStats] = useState({
    students: 0,
    departments: 0,
    courses: 0,
    users: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const students = await getAllStudents();
    const departments = await getDepartments();
    const courses = await getCourses();
    const users = await getAllUsers();

    
    setStats({
  students: students.data.length,
  departments: departments.data.length,
  courses: courses.data.length,
  users: users.data.length,
});
  }

  const cards = [
    { title: "Students", value: stats.students, icon: <GraduationCap /> },
    { title: "Departments", value: stats.departments, icon: <Building2 /> },
    { title: "Courses", value: stats.courses, icon: <BookOpen /> },
    { title: "Users", value: stats.users, icon: <Users /> },
  ];

  const pieData = [
    { name: "Students", value: stats.students },
    { name: "Departments", value: stats.departments },
    { name: "Courses", value: stats.courses },
    { name: "Users", value: stats.users },
  ];

  const COLORS = ["#3B82F6", "#22C55E", "#A855F7", "#F97316"];

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Dashboard Overview
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((s, i) => (
          <motion.div key={i} className="bg-white p-5 rounded-xl shadow flex justify-between">
            <div>
              <p className="text-gray-500">{s.title}</p>
              <h3 className="text-3xl font-bold">{s.value}</h3>
            </div>
            <div className="text-blue-600 text-3xl">{s.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">

        {/* PIE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={110} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="bg-white p-6 rounded-xl shadow">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pieData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}