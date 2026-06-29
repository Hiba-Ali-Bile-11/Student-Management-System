import React from "react";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Users
} from "lucide-react";

export default function DashStatus() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <div className="bg-white rounded-2xl shadow p-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">Students</p>
            <h3 className="text-3xl font-bold">250</h3>
          </div>
          <GraduationCap className="text-blue-600" size={35} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">Departments</p>
            <h3 className="text-3xl font-bold">5</h3>
          </div>
          <Building2 className="text-green-600" size={35} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5">
        <div>
          <p className="text-gray-500">Courses</p>
          <h3 className="text-3xl font-bold">20</h3>
        </div>
        <BookOpen className="text-purple-600" size={35} />
      </div>

      <div className="bg-white rounded-2xl shadow p-5">
        <div>
          <p className="text-gray-500">Users</p>
          <h3 className="text-3xl font-bold">180</h3>
        </div>
        <Users className="text-orange-600" size={35} />
      </div>

    </div>
  );
}